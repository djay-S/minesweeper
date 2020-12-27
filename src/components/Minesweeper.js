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
    customSelected: false,
    showModal: false,
  };

  gameSelect = (e) => {
    let row = 0,
      col = 0,
      mines = 0;
    const level = e.target.name;
    if (level === "levelEasy") {
      row = 5;
      col = 5;
      mines = 5;
    }
    if (level === "levelMedium") {
      row = 10;
      col = 7;
      mines = 20;
    }
    if (level === "levelHard") {
      row = 10;
      col = 9;
      mines = 50;
    }
    if (level === "levelCustom") {
      this.setState({ customSelected: true });
    }
    this.setState({
      rows: row,
      columns: col,
      mines: mines,
    });
  };

  getCustomGridData = () => {
    // renderCustomDataEntries()
  };

  renderCustomDataEntries = () => {
    console.log("Custom");
    if (this.state.customSelected) {
      return <h2>sdfgfgd</h2>;
    }
    return (
      // <div className='sdfd'>
      // <input type='text' name='row' value='Enter Row  Value' />Roes
      <h2>sdfg</h2>
      // sdf
      // </div>
    );
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
          heading={"Custom"}
          name="levelCustom"
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
