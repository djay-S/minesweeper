import React, { Component } from "react";
import Board from "./Board";
import Help from "../view/Help";

export default class Game extends Component {
  state = {
    height: this.props.height,
    width: this.props.width,
    totalMines: this.props.mines,
    showModal: false,
  };

  toggleShowModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleInputFromHelp = (isActive) => {
    this.setState({ showModal: isActive });
  };

  render() {
    const { height, width, totalMines } = this.state;
    return (
      <div className="game">
        <div className="help-button" onClick={this.toggleShowModal}>
          ℹ️
        </div>
        {this.state.showModal ? (
          <Help
            isActive={this.state.showModal}
            toggleClose={this.handleInputFromHelp}
          />
        ) : null}
        <Board height={height} width={width} totalMines={totalMines} />
      </div>
    );
  }
}
