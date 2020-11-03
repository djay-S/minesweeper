import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {
  state = {
    height: this.props.height,
    width: this.props.width,
    totalMines: this.props.mines
  };

  render() {
    const { height, width, totalMines } = this.state;
    return (
      <div className='game'>
        <Board height={height} width={width} totalMines={totalMines} />
      </div>
    );
  }
}
