import React, { Component } from 'react'
import Game from './Game'

export default class Minesweeper extends Component {
    state = {
        rows: 0,
        columns: 0,
        mines: 0,
        newGame: false,
        customSelected: false,
    }

    startGame = () => {
        this.setState({ newGame: true })
    }

    gameSelect = (e) => {
        let row = 0, col = 0, mines = 0
        const level = e.target.name
        console.log(level)
        if (level === 'levelEasy') {
            row = 5
            col = 5
            mines = 5
        }
        if (level === 'levelMedium') {
            row = 10
            col = 7
            mines = 20
        }
        if (level === 'levelHard') {
            row = 10
            col = 9
            mines = 50
        }
        if (level === 'levelCustom') {
            this.setState({ customSelected: true })
        }
        this.setState({
            rows: row,
            columns: col,
            mines: mines
        })
    }

    getCustomGridData = () => {
        // renderCustomDataEntries()
    }

    renderCustomDataEntries = () => {
        console.log('Custom')
        if (this.state.customSelected) {
            return (<h2>sdfgfgd</h2>)
        }
        return (
            // <div className='sdfd'>
            // <input type='text' name='row' value='Enter Row  Value' />Roes
            <h2>sdfg</h2>
            // sdf
            // </div>
        )
    }

    refreshPage = () => {
        window.location.reload(false)
    }

    render() {
        return (
            <div>
                {
                    (!this.state.newGame) ?
                        <div>
                            Levels
                            <br /><br /><table>
                                <tbody>
                                    <tr>
                                        <td title='5x5 grid'><input type='radio' name='levelEasy' onChange={this.gameSelect} />Easy </td>
                                        <td title='10x7 grid'><input type='radio' name='levelMedium' onChange={this.gameSelect} />Medium </td>
                                        <td title='10x10 grid'><input type='radio' name='levelHard' onChange={this.gameSelect} />Hard </td>
                                        {/* <td title='custom grid'><input type='radio' name='levelCustom' onChange={this.gameSelect} />Custom </td> */}
                                        {/* coz of the paranthesis{this.renderCustomDataEntries} */}
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                        </div>
                        : null}
                {(this.state.columns * this.state.rows > 0 && !this.state.newGame) ? <button onClick={this.startGame}>Start Game</button> : null
                }
                {
                    (this.state.columns * this.state.rows > 0 && this.state.newGame) ?
                        <div>
                            {/* <button onClick={this.refreshPage}>New Game</button> */}
                            <Game height={this.state.rows} width={this.state.columns} mines={this.state.mines} />
                        </div>
                        : null
                }
            </div>
        )
    }
}