import React, { Component } from 'react'

export default class Stopwatch extends Component {
    state = {
        startTime: 0,
        time: 0,
        action: this.initialiseStopwatch(this.props.action),
    }

    initialiseStopwatch(action)  {
        if (action === 'start') {
            this.setState({ startTime: Date.now() })
        }
        if (action === 'stop') {
            this.setState({ time: (Date.now() - this.state.startTime) })
        }
    }

    timePassed = () => {
        return <div>⌚⏳⌛⏲️⏱️: {this.state.time}</div>
    }

    render() {
        return (
            <div>
                {this.timePassed()}
            </div>
        )
    }
}