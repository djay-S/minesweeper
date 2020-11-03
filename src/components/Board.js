import React, { Component } from 'react';
import Cell from './Cell';
import Stopwatch from './Stopwatch'

export default class Board extends Component {
    state = {
        boardData: this.initBoardData(this.props.height, this.props.width, this.props.totalMines),
        gameStatus: '',
        gameTime: -1,
        stopwatchAction: 'start',
        mineCount: this.props.totalMines,
    };

    // get mines
    getMines(data) {
        let mineArray = [];

        data.map(datarow => {
            datarow.map((dataitem) => {
                if (dataitem.isMine) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    // get Flags
    getFlags(data) {
        let mineArray = [];

        data.map(datarow => {
            datarow.map((dataitem) => {
                if (dataitem.isFlagged) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    // get Hidden cells
    getHidden(data) {
        let mineArray = [];

        data.map(datarow => {
            datarow.map((dataitem) => {
                if (!dataitem.isRevealed) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    // Initialize the  board 
    initBoardData(height, width, totalMines) {
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

    // plant mines on the board
    plantMines(data, height, width, totalMines) {
        let randomx, randomy, minesPlanted = 0;
        while (minesPlanted < totalMines) {
            randomx = Math.floor(Math.random() * width)
            randomy = Math.floor(Math.random() * height)
            if (!(data[randomy][randomx].isMine)) {
                data[randomy][randomx].isMine = true;
                minesPlanted++;
            }
        }

        return (data);
    }

    // get number of neighbouring mines for each board cell
    getNeighbours(data, height, width) {
        let updatedData = data, index = 0;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (!data[i][j].isMine) {
                    let mine = 0;
                    const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
                    area.map(value => {
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

        return (updatedData);
    };

    // looks for neighbouring cells and returns them
    traverseBoard(x, y, data) {
        const el = [];

        //up
        if (x > 0) {
            el.push(data[x - 1][y]);
        }

        //down
        if (x < this.props.height - 1) {
            el.push(data[x + 1][y]);
        }

        //left
        if (y > 0) {
            el.push(data[x][y - 1]);
        }

        //right
        if (y < this.props.width - 1) {
            el.push(data[x][y + 1]);
        }

        // top left
        if (x > 0 && y > 0) {
            el.push(data[x - 1][y - 1]);
        }

        // top right
        if (x > 0 && y < this.props.width - 1) {
            el.push(data[x - 1][y + 1]);
        }

        // bottom right
        if (x < this.props.height - 1 && y < this.props.width - 1) {
            el.push(data[x + 1][y + 1]);
        }

        // bottom left
        if (x < this.props.height - 1 && y > 0) {
            el.push(data[x + 1][y - 1]);
        }

        return el;
    }

    // reveals the whole board
    revealBoard() {
        let updatedData = this.state.boardData;
        updatedData.map((datarow) => {
            datarow.map((dataitem) => {
                dataitem.isRevealed = true;
            });
        });
        this.setState({
            boardData: updatedData
        })
    }

    /* reveal logic for empty cell */
    revealEmpty(x, y, data) {
        let area = this.traverseBoard(x, y, data);
        area.map(value => {
            if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
                data[value.x][value.y].isRevealed = true;
                if (value.isEmpty) {
                    this.revealEmpty(value.x, value.y, data);
                }
            }
        });
        return data;

    }

    // Handle User Events

    handleCellClick(x, y) {
        //for the first click
        if (this.state.gameTime === -1) {
            this.setState({ gameTime: 0 })

        }

        // check if revealed. return if true.
        if (this.state.boardData[x][y].isRevealed || this.state.boardData[x][y].isFlagged) return null;

        // check if clicked on mine. game over if true
        if (this.state.boardData[x][y].isMine) {
            this.setState({ gameStatus: 'You Lost.' });
            this.setState({ stopwatchAction: 'stop' })
            this.revealBoard();
            // alert('game over');
        }

        let updatedData = this.state.boardData;
        updatedData[x][y].isFlagged = false;
        updatedData[x][y].isRevealed = true;

        if (updatedData[x][y].isEmpty) {
            updatedData = this.revealEmpty(x, y, updatedData);
        }

        if (this.getHidden(updatedData).length === this.props.totalMines) {
            this.setState({ mineCount: 0, gameStatus: 'You Win.' });
            this.setState({ stopwatchAction: 'stop' })
            this.revealBoard();
            // alert('You Win');
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

        // check if already revealed
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
            const mineArray = this.getMines(updatedData);
            const flagArray = this.getFlags(updatedData);
            if (JSON.stringify(mineArray) === JSON.stringify(flagArray)) {
                this.setState({ mineCount: 0, gameStatus: 'You Win.' });
                this.setState({ stopwatchAction: 'stop' })
                this.revealBoard();
                // alert('You Win');
            }
        }

        this.setState({
            boardData: updatedData,
            mineCount: mines,
        });
    }

    renderBoard(data) {
        return data.map((datarow) => {
            return datarow.map((dataitem) => {
                return (
                    <div key={dataitem.x * datarow.length + dataitem.y}>
                        <Cell
                            onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
                            cMenu={(e) => this.handleContextMenu(e, dataitem.x, dataitem.y)}
                            cellValue={dataitem}
                        />
                        {/* {(datarow[datarow.length - 1] === dataitem) ? <div className='clear' /> : ''} */}
                    </div>);
            })
        });

    }

    refreshPage = () => {
        window.location.reload(false)
    }

    pauseGame = () => {
        let game = this.state.gameStatus === 'paused' ? '' : 'paused'
        this.setState({ gameStatus: game })
    }

    render() {
        let game = this.state.gameStatus === 'You Lost.' ? 'lost' : this.state.gameStatus === 'You Win.' ? 'won' : ''
        let style = { width: 'calc( 5vw * ' + this.props.width }
        let pauseButton = (this.state.gameStatus !== 'paused') ? '⏸️' : '▶️'
        return (
            <div className='board'>
                <div className={'game-info ' + game}>
                    <div className='game_controls'>
                        <div className='cursor_change' onClick={this.refreshPage}>🔄</div>
                        <div className='cursor_change'>💣: {this.state.mineCount}</div>
                        {(this.state.gameStatus !== 'You Lost.') ? <div className='cursor_change' onClick={this.pauseGame}>{pauseButton}</div> : null}
                        <div className='game_status'>{(this.state.gameStatus !== 'paused') ? (this.state.gameStatus) : null}</div>
                        <Stopwatch action={this.state.stopwatchAction} />
                    </div>
                </div>
                <div className='grid' style={style}>
                    {(this.state.gameStatus === 'paused') ?
                        <h1 className='pause_text'>Game Paused</h1> :
                        (this.renderBoard(this.state.boardData))
                    }
                </div>
            </div>
        );
    }
}