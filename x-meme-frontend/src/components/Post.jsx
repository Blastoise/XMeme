import React, { Component } from "react";
import ModalForm from "./ModalForm";
import logo from "./../assets/avatar.png";
import "./Post.css";

class Post extends Component {
  state = {
    id: "",
    show: false,
  };

  // Method for handling the click event of Edit button
  handleClick = (id) => {
    this.setState({ id: id, show: !this.state.show });
  };

  // Method for handling onHide prop of Modal
  onHide = () => {
    this.setState({ show: !this.state.show });
  };

  // Method for handling the submission of form in Modal
  handleSubmit = (data) => {
    this.props.handlePatch(this.state.id, data);

    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <div>
        {this.props.memes.map((item) => (
          <div
            className="post-container row justify-content-center"
            key={item.id}
          >
            <div className="posts-container col-sm-12 col-lg-6">
              <div className="post">
                <div className="post_header">
                  <div className="left">
                    <div className="post_avatar">
                      <img src={logo} alt="" />
                    </div>
                    <div className="post_headerText">
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                  <div className="right">
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => this.handleClick(item.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="post_body">
                  <div className="post_headerDescription">
                    <p>{item.caption}</p>
                  </div>
                  <img src={item.url} alt="" />
                </div>
              </div>
            </div>
          </div>
        ))}
        <ModalForm
          show={this.state.show}
          onSubmit={this.handleSubmit}
          onHide={this.onHide}
        />
      </div>
    );
  }
}

export default Post;
