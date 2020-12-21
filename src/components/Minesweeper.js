import React, { Component } from "react";
import Game from "./Game";
import Tile from "./Tile";

export default class Minesweeper extends Component {
  state = {
    rows: 0,
    columns: 0,
    mines: 0,
    newGame: false,
    customSelected: false,
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

  handleInputFromChild = (row, col, mines) => {
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
          handleInput={this.handleInputFromChild}
        />
        <Tile
          heading={"Medium"}
          name="levelMedium"
          selected={false}
          handleInput={this.handleInputFromChild}
        />
        <Tile
          heading={"Hard"}
          name="levelHard"
          selected={false}
          handleInput={this.handleInputFromChild}
        />
        <Tile
          heading={"Custom"}
          name="levelCustom"
          selected={false}
          handleInput={this.handleInputFromChild}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        {!this.state.newGame ? (
          <div>
            <h1>Minesweeper</h1>
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
