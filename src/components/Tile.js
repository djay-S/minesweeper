import React, { Component } from "react";
import levelHard from "../assets/levelHard.png";
import levelEasy from "../assets/levelEasy.png";
import levelMedium from "../assets/levelMedium.png";
import levelCustom from "../assets/levelCustom.png";

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
    this.props.handleInput(
      this.state.rows,
      this.state.columns,
      this.state.mines
    );
  };

  getImagePath = () => {
    const level = this.props.name;
    if (level === "levelEasy") return levelEasy;
    if (level === "levelMedium") return levelMedium;
    if (level === "levelHard") return levelHard;
    if (level === "levelCustom") return levelCustom;
  };

  render() {
    return (
      <div className="tile" onClick={this.gameSelected}>
        <h2>{this.props.heading}</h2>

        <img
          src={this.getImagePath()}
          // src="http://bgfons.com/uploads/tile/tile_texture3062.jpg"
          alt={this.props.name}
        />
      </div>
    );
  }
}
