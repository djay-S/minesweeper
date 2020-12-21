import React, { Component } from "react";

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      isActive: false,
      isPaused: true,
      isGameOver: false,
    };
  }

  formatTime = () => {
    let time = this.state.secondsElapsed;
    let minutes = Math.floor(time / 60);
    let seconds = ("00" + (time % 60)).slice(-2);
    console.log(minutes + ":" + seconds);
    return minutes + ":" + seconds;
  };

  handleGameTimer = () => {
    if (this.props.gameState === "") {
    } else if (this.props.gameState === "active") {
      if (!this.state.isActive && !this.state.isGameOver) {
        this.setState({ isActive: true, isPaused: false });
        this.incrementer = setInterval(() => {
          this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
        }, 1000);
      }
    } else if (this.props.gameState === "paused") {
      if (!this.state.isPaused && !this.state.isGameOver) {
        clearInterval(this.incrementer);
        this.setState({ isActive: false, isPaused: true });
      }
    } else {
      if (!this.state.isGameOver) {
        this.setState({ isGameOver: true });
      }
      if (this.state.isActive || !this.state.isPaused) {
        clearInterval(this.incrementer);
      }
    }
  };

  render() {
    return (
      <div>
        {/* Stopwatch ⌚⏳⌛⏲️ */}
        ⏱️ {this.formatTime()}
        {this.handleGameTimer()}
      </div>
    );
  }
}
