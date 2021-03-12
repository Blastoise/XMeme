import React, { Component } from "react";

class InputForm extends Component {
  state = {
    formData: {
      name: "",
      caption: "",
      url: "",
    },
  };

  // Method for controlling the form elements
  handleChange = ({ currentTarget: input }) => {
    let formData = { ...this.state.formData };
    formData[input.name] = input.value;
    this.setState({ formData });
  };

  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onSubmit({ ...this.state.formData });
        }}
      >
        <div className="form-group">
          <label htmlFor="name" className="required-field">
            <strong>Meme Owner</strong>
          </label>
          <input
            name="name"
            type="text"
            value={this.state.formData.name}
            className="form-control"
            id="name"
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="caption" className="required-field">
            <strong>Caption</strong>
          </label>
          <input
            name="caption"
            type="text"
            value={this.state.formData.caption}
            className="form-control"
            id="caption"
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="url" className="required-field">
            <strong>Meme URL</strong>
          </label>
          <input
            name="url"
            type="url"
            value={this.state.formData.url}
            className="form-control"
            id="url"
            onChange={this.handleChange}
            required
          />
        </div>
        <button className="btn btn-outline-success">Submit</button>
      </form>
    );
  }
}

export default InputForm;
