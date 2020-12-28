import React, { Component } from "react";
import Game from "./Game";
import Tile from "./Tile";
import Help from "../view/Help";

export default class Minesweeper extends Component {
  state = {
    rows: 0,
    columns: 0,
    mines: 0,
    newGame: false,
    showModal: false,
  };

  refreshPage = () => {
    window.location.reload(false);
  };

  handleInputFromTile = (row, col, mines) => {
    console.log("here", row, col, mines);
    setTimeout(() => {
      this.setState({
        rows: row,
        columns: col,
        mines: mines,
        newGame: true,
      });
    }, 50);
  };

  renderLevelTiles = () => {
    return (
      <div className="container">
        <Tile
          heading={"Easy"}
          name="levelEasy"
          selected={false}
          handleInput={this.handleInputFromTile}
        />
        <Tile
          heading={"Medium"}
          name="levelMedium"
          selected={false}
          handleInput={this.handleInputFromTile}
        />
        <Tile
          heading={"Hard"}
          name="levelHard"
          selected={false}
          handleInput={this.handleInputFromTile}
        />
        <Tile
          heading={"Extreme"}
          name="levelExtreme"
          selected={false}
          handleInput={this.handleInputFromTile}
        />
      </div>
    );
  };

  toggleShowModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleInputFromHelp = (isActive) => {
    this.setState({ showModal: isActive });
  };

  render() {
    let fadeClass = this.state.showModal ? "" : "fade-out";
    return (
      <div className={fadeClass}>
        {!this.state.newGame ? (
          <div>
            <h1>
              Minesweeper
              <div className="help-button" onClick={this.toggleShowModal}>
                ℹ️
              </div>
            </h1>
            {this.state.showModal ? (
              <Help
                isActive={this.state.showModal}
                toggleClose={this.handleInputFromHelp}
              />
            ) : null}
            {this.renderLevelTiles()}
          </div>
        ) : null}
        {this.state.columns * this.state.rows > 0 && this.state.newGame ? (
          <div>
            <Game
              height={this.state.rows}
              width={this.state.columns}
              mines={this.state.mines}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
