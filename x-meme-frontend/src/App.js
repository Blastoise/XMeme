import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Post from "./components/Post";
import InputForm from "./components/InputForm";
import "./App.css";

// For notification
toast.configure();

class App extends Component {
  state = {
    memes: [],
  };

  componentDidMount() {
    // Getting memes from Backend
    axios
      .get("https://x-meme-ashutosh.herokuapp.com/memes/")
      .then((res) => {
        this.setState({ memes: res.data });
      })
      .catch((err) =>
        toast.error("Something Went Wrong", {
          position: toast.POSITION.BOTTOM_CENTER,
        })
      );
  }

  // Method for modifying meme object after PATCH request
  objectHelper = (element, keys, data) => {
    keys.forEach((item) => (element[item] = data[item]));
    return element;
  };

  // Method to handle PATCH request
  handlePatch = (id, data) => {
    axios
      .patch("https://x-meme-ashutosh.herokuapp.com/memes/" + id, data)
      .then((res) => {
        const keys = Object.keys(data);
        const memes = this.state.memes.map((element) =>
          element.id === id
            ? this.objectHelper({ ...element }, keys, data)
            : element
        );

        toast.success("Meme Created Successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });

        this.setState({ memes });
      })
      .catch((err) => {
        toast.error("Something Went Wrong", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  };

  // Method to handle POST request
  handleSubmit = (data) => {
    axios
      .post("https://x-meme-ashutosh.herokuapp.com/memes/", data)
      .then((res) => {
        data.id = res.data.id;
        let memes = [data, ...this.state.memes];

        toast.success("Meme Created Successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });

        this.setState({
          memes: memes.slice(0, 100),
        });
      })
      .catch((err) => {
        toast.error("Something Went Wrong", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid header-container">
          <h1>X-MEME</h1>
        </div>
        <div className="container meme-form">
          <div className="row justify-content-center">
            <div className="meme-form-container col-sm-12 col-lg-6">
              <h2 className="meme-form-header">Share Meme</h2>
              <InputForm onSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
        <div className="container posts-margin">
          <Post memes={this.state.memes} handlePatch={this.handlePatch} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
