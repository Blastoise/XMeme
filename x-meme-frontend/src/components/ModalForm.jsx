import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class ModalForm extends Component {
  state = {
    formData: {
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

  // Method for handling the submit event of form in Modal
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      caption: this.state.formData.caption,
      url: this.state.formData.url,
    };

    if (!data.caption) delete data.caption;
    if (!data.url) delete data.url;

    this.props.onSubmit(data);
    this.setState({
      formData: {
        caption: "",
        url: "",
      },
    });
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Meme
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="caption">
              <strong>Caption</strong>
            </label>
            <input
              name="caption"
              type="text"
              value={this.state.formData.caption}
              className="form-control"
              id="caption"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">
              <strong>Meme URL</strong>
            </label>
            <input
              name="url"
              type="url"
              value={this.state.formData.url}
              className="form-control"
              id="url"
              onChange={this.handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!this.state.formData.caption && !this.state.formData.url}
            variant="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalForm;
