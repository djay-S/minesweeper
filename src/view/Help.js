import React, { Component } from "react";
import Modal from "../components/modal/Modal";

export default class Help extends Component {
  constructor(props) {
    super(props);
  }

  handleInputFromModal = (isActive) => {
    this.props.toggleClose(isActive);
  };

  helpText = () => {
    return (
      <span>
        <h3>How to Play</h3>
        <p>
          <ul>
            <li>
              Your objective is to clear the grid without trigerring any mine 💣
            </li>
            <li>
              Click on the covered blocks to clear them. Numbered blocks
              indicate the number of mines in the adjacent cells.
            </li>
            <li>You can flag 🚩 a block by right clicking on it.</li>
            <li>Flagged blocks can be cleared only after unflagging them.</li>
            <li>
              The top panel shows the number of un-flagged mines and the game
              time elapsed
            </li>
            <li>Try to clear the grid in the shortest time possible</li>
          </ul>
          <center>All the best 🙂</center>
        </p>
      </span>
    );
  };

  render() {
    return (
      <div>
        <Modal
          isActive={this.props.isActive}
          toggleClose={this.handleInputFromModal}
        >
          {this.helpText()}
        </Modal>
      </div>
    );
  }
}
