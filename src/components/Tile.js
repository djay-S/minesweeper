import React, { Component } from "react";
import levelHard from "../assets/levelHard.png";
import levelEasy from "../assets/levelEasy.png";
import levelMedium from "../assets/levelMedium.png";
import levelExtreme from "../assets/levelExtreme.png";

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 0,
      columns: 0,
      mines: 0,
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
      mines = 25;
    }
    if (level === "levelExtreme") {
      row = 10;
      col = 10;
      mines = 50;
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

  getLevelDesc = () => {
    const level = this.props.name;
    let row = 0,
      col = 0,
      mines = 0;
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
      mines = 25;
    }
    if (level === "levelExtreme") {
      row = 10;
      col = 10;
      mines = 50;
    }
    return (
      <h2>
        Grid: {row} x {col}<br/>
        Mines: {mines}
      </h2>
    );
  };

  getImagePath = () => {
    const level = this.props.name;
    if (level === "levelEasy") return levelEasy;
    if (level === "levelMedium") return levelMedium;
    if (level === "levelHard") return levelHard;
    if (level === "levelExtreme") return levelExtreme;
  };

  render() {
    return (
      <div className="tile" onClick={this.gameSelected}>
        <h2>{this.props.heading}</h2>
        <div className="level-desc">{this.getLevelDesc()}</div>
        <img src={this.getImagePath()} alt={this.props.name} />
      </div>
    );
  }
}
