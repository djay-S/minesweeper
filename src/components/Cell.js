import React, { Component } from "react";

export default class Cell extends Component {
  getValue() {
    const { cellValue } = this.props;

    if (!cellValue.isRevealed) {
      return this.props.cellValue.isFlagged ? "🚩" : null;
    }
    if (cellValue.isMine) {
      return "💣";
    }
    if (cellValue.neighbour === 0) {
      return null;
    }
    return cellValue.neighbour;
  }

  render() {
    const { cellValue, onClick, cMenu } = this.props;
    let className =
      "cell" +
      (cellValue.isRevealed ? "" : " hidden") +
      (cellValue.isMine ? " is-mine" : "") +
      (cellValue.isFlagged ? " is-flag" : "");

    return (
      <div onClick={onClick} className={className} onContextMenu={cMenu}>
        {this.getValue()}
      </div>
    );
  }
}
