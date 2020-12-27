import React, { Component } from "react";
import "./modal.scss";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive,
    };
  }

  handleClose = () => {
    // this.props.toggleClose(!this.state.isActive);
    this.props.toggleClose(!this.state.isActive);
  };

  render() {
    let fadeClass = this.state.isActive ? "fade-in" : "fade-out";
    return (
      <div className={"modal " + fadeClass}>
        <div className="modal-outer">
          <span className="close" onClick={this.handleClose} title="close">
            {"\u2715"}
          </span>
          <div className="modal-content">{this.props.children} </div>
        </div>
      </div>
    );
  }
}
