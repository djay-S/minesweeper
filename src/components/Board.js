import React, { Component } from "react";
import Cell from "./Cell";
import Stopwatch from "./Stopwatch";

export default class Board extends Component {
  state = {
    boardData: this.initialiseBoard(
      this.props.height,
      this.props.width,
      this.props.totalMines
    ),
    gameStatus: "active",
    gameTime: -1,
    stopwatchAction: "",
    mineCount: this.props.totalMines,
  };

  // spread mines
  getMines(data) {
    let minesArray = [];
    data.map((rowdata) => {
      rowdata.map((dataElement) => {
        if (dataElement.isMine) {
          minesArray.push(dataElement);
        }
      });
    });
    return minesArray;
  }

  // get Flags
  getFlags(data) {
    let minesArray = [];
    data.map((rowdata) => {
      rowdata.map((dataElement) => {
        if (dataElement.isFlagged) {
          minesArray.push(dataElement);
        }
      });
    });
    return minesArray;
  }

  // get Hidden cells
  getHidden(data) {
    let minesArray = [];
    data.map((rowdata) => {
      rowdata.map((dataElement) => {
        if (!dataElement.isRevealed) {
          minesArray.push(dataElement);
        }
      });
    });
    return minesArray;
  }

  // Initialize the grid
  initialiseBoard(height, width, totalMines) {
    let data = this.createEmptyArray(height, width);
    data = this.plantMines(data, height, width, totalMines);
    data = this.getNeighbours(data, height, width);
    return data;
  }

  createEmptyArray(height, width) {
    let data = [];
    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    return data;
  }

  // plant mines on the grid
  plantMines(data, height, width, totalMines) {
    let randomx,
      randomy,
      minesPlanted = 0;
    while (minesPlanted < totalMines) {
      randomx = Math.floor(Math.random() * width);
      randomy = Math.floor(Math.random() * height);
      if (!data[randomy][randomx].isMine) {
        data[randomy][randomx].isMine = true;
        minesPlanted++;
      }
    }
    return data;
  }

  // get number of neighbouring mines cell
  getNeighbours(data, height, width) {
    let updatedData = data;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (!data[i][j].isMine) {
          let mine = 0;
          const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
          area.map((value) => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].neighbour = mine;
        }
      }
    }

    return updatedData;
  }

  // traverse the grid
  traverseBoard(x, y, data) {
    const ele = [];

    //TT
    if (x > 0) {
      ele.push(data[x - 1][y]);
    }

    // TR
    if (x > 0 && y < this.props.width - 1) {
      ele.push(data[x - 1][y + 1]);
    }

    //RR
    if (y < this.props.width - 1) {
      ele.push(data[x][y + 1]);
    }

    // BR
    if (x < this.props.height - 1 && y < this.props.width - 1) {
      ele.push(data[x + 1][y + 1]);
    }

    //BB
    if (x < this.props.height - 1) {
      ele.push(data[x + 1][y]);
    }

    // BL
    if (x < this.props.height - 1 && y > 0) {
      ele.push(data[x + 1][y - 1]);
    }

    //LL
    if (y > 0) {
      ele.push(data[x][y - 1]);
    }
    
    // TL
    if (x > 0 && y > 0) {
      ele.push(data[x - 1][y - 1]);
    }

    return ele;
  }

  // reveal the whole grid
  revealBoard() {
    let updatedData = this.state.boardData;
    updatedData.map((rowdata) => {
      rowdata.map((dataElement) => {
        dataElement.isRevealed = true;
      });
    });
    this.setState({
      boardData: updatedData,
    });
  }

  // reveal empty cells
  revealEmpty(x, y, data) {
    let area = this.traverseBoard(x, y, data);
    area.map((value) => {
      if (
        !value.isFlagged &&
        !value.isRevealed &&
        (value.isEmpty || !value.isMine)
      ) {
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          this.revealEmpty(value.x, value.y, data);
        }
      }
    });
    return data;
  }

  handleCellClick(x, y) {
    //for the first click
    if (this.state.gameTime === -1 || this.state.stopwatchAction === "") {
      this.setState({ gameTime: 0 });
      this.setState({ stopwatchAction: "active" });
    }

    // check if revealed. return if true.
    if (
      this.state.boardData[x][y].isRevealed ||
      this.state.boardData[x][y].isFlagged
    )
      return null;

    // check if clicked on mine. game over if true
    if (this.state.boardData[x][y].isMine) {
      this.setState({ gameStatus: "You Stepped on a Mine.  ⚰️" });
      this.setState({ stopwatchAction: "stop" });
      this.revealBoard();
    }

    let updatedData = this.state.boardData;
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      updatedData = this.revealEmpty(x, y, updatedData);
    }

    if (this.getHidden(updatedData).length === this.props.totalMines) {
      this.setState({ mineCount: 0, gameStatus: "All Mines Cleared. 🏆😎" });
      this.setState({ stopwatchAction: "stop" });
      this.revealBoard();
    }

    this.setState({
      boardData: updatedData,
      mineCount: this.props.totalMines - this.getFlags(updatedData).length,
    });
  }

  handleContextMenu(e, x, y) {
    e.preventDefault();
    let updatedData = this.state.boardData;
    let mines = this.state.mineCount;

    if (updatedData[x][y].isRevealed) return;

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      mines++;
    } else {
      if (mines > 0) {
        updatedData[x][y].isFlagged = true;
        mines--;
      }
    }

    if (mines === 0) {
      const minesArray = this.getMines(updatedData);
      const flagArray = this.getFlags(updatedData);
      if (JSON.stringify(minesArray) === JSON.stringify(flagArray)) {
        this.setState({ mineCount: 0, gameStatus: "All Mines Cleared. 🏆😎" });
        this.setState({ stopwatchAction: "stop" });
        this.revealBoard();
      }
    }

    this.setState({
      boardData: updatedData,
      mineCount: mines,
    });
  }

  renderBoard(data) {
    return data.map((rowdata) => {
      return rowdata.map((dataElement) => {
        return (
          <div key={dataElement.x * rowdata.length + dataElement.y}>
            <Cell
              onClick={() => this.handleCellClick(dataElement.x, dataElement.y)}
              cMenu={(e) => this.handleContextMenu(e, dataElement.x, dataElement.y)}
              cellValue={dataElement}
            />
          </div>
        );
      });
    });
  }

  refreshPage = () => {
    window.location.reload(false);
  };

  pauseGame = () => {
    let game = this.state.gameStatus === "paused" ? "active" : "paused";
    this.setState({ stopwatchAction: game });
    this.setState({ gameStatus: game });
  };

  render() {
    let game =
      this.state.gameStatus === "You Stepped on a Mine.  ⚰️"
        ? "lost"
        : this.state.gameStatus === "All Mines Cleared. 🏆😎"
        ? "won"
        : "active";
    let style = { width: "calc( 5vw * " + this.props.width };
    let pauseButton = this.state.gameStatus !== "paused" ? "⏸️" : "▶️";
    return (
      <div className="board">
        <div className={"game-info " + game}>
          <div className="game_controls">
            <div className="cursor_change" onClick={this.refreshPage}>
              🔄
            </div>
            <div className="cursor_change">💣: {this.state.mineCount}</div>
            {this.state.gameStatus !== "You Stepped on a Mine.  ⚰️" ? (
              <div className="cursor_change" onClick={this.pauseGame}>
                {pauseButton}
              </div>
            ) : null}
            <div className="game_status">
              {this.state.gameStatus !== "paused" &&
              this.state.gameStatus !== "active"
                ? this.state.gameStatus
                : "\u00A0"}
            </div>
            <Stopwatch gameState={this.state.stopwatchAction} />
          </div>
        </div>
        <div className="grid" style={style}>
          {this.state.gameStatus === "paused" ? (
            <h1 className="pause_text">Game Paused</h1>
          ) : (
            this.renderBoard(this.state.boardData)
          )}
        </div>
      </div>
    );
  }
}
