import React, { Component } from "react";

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 0,
      columns: 0,
      mines: 0,
      customSelected: false,
    };
  }

  gameSelected = () => {
    let row = 0,
      col = 0,
      mines = 0;
    const level = this.props.name;
    console.log(level);
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
    this.setState(
      {
        rows: row,
        columns: col,
        mines: mines,
      },
      function () {
        this.onInputChange();
      }
    );
  };

  onInputChange = () => {
    console.log(this.state.rows, this.state.columns, this.state.mines);
    this.props.handleInput(
      this.state.rows,
      this.state.columns,
      this.state.mines
    );
  };

  render() {
    return (
      <span className="tile">
        <h2>{this.props.heading}</h2>
        <button name={this.props.name} onClick={this.gameSelected}>
          <br />
          <br />
          <img
            src="http://bgfons.com/uploads/tile/tile_texture3062.jpg"
            alt={this.props.name}
          />
        </button>
      </span>
    );
  }
}
