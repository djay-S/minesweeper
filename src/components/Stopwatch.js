// // import React, { Component } from 'react'

// // export default class Stopwatch extends Component {
// //     state = {
// //         startTime: 0,
// //         time: 0,
// //         elapsedTime: 0,
// //         action: this.initialiseStopwatch(this.props.action),
// //     }

// //     stopwatch = () =>{
// //         let time = this.state.elapsedTime;
// //         // time = setInterval(() => {
// //         //     time.current
// //         // })
// //         time.current = setInterval(() => {
// //             setTimer((timer) => timer + 1)
// //         }, 1000)
// //     }

// //     initialiseStopwatch(action)  {
// //         if (action === 'start') {
// //             this.setState({ startTime: Date.now() })
// //         }
// //         if (action === 'stop') {
// //             this.setState({ time: (Date.now() - this.state.startTime) })
// //         }
// //     }

// //     timePassed = () => {
// //         return <div>⌚⏳⌛⏲️⏱️: {this.state.time}</div>
// //     }

// //     render() {
// //         return (
// //             <div>
// //                 {this.timePassed()}
// //             </div>
// //         )
// //     }
// // }

// import React, { useState, useRef } from 'react';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { faClock } from '@fortawesome/free-regular-svg-icons'

// // import './App.css';

// // const element = <FontAwesomeIcon icon={faClock} />

// const Stopwatch = ({ action }) => {
//     const [timer, setTimer] = useState(0)
//     // const [isActive, setIsActive] = useState(false)
//     const [isPaused, setIsPaused] = useState(false)
//     const increment = useRef(0)

//     const handleStart = () => {
//         if (!isPaused) {
//             // setIsActive(true)
//             setIsPaused(true)
//             // increment.current =
//             setInterval(() => {
//                 setTimer((timer) => timer + 1)
//             }, 1000)
//         }
//     }

//     const handlePause = () => {
//         if (isPaused) {
//             clearInterval(increment.current)
//             setTimer((timer) => timer)
//             setIsPaused(false)
//         }
//     }

//     const handleResume = () => {
//         setIsPaused(true)
//         // increment.current =
//         setInterval(() => {
//             setTimer((timer) => timer + 1)
//         }, 1000)
//     }

//     const handleReset = () => {
//         clearInterval(increment.current)
//         // setIsActive(false)
//         setIsPaused(false)
//         setTimer(0)
//     }

//     const formatTime = () => {
//         const getSeconds = `0${(timer % 60)}`.slice(-2)
//         const minutes = `${Math.floor(timer / 60)}`
//         const getMinutes = `0${minutes % 60}`.slice(-2)
//         const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

//         return `${getHours} : ${getMinutes} : ${getSeconds}`
//     }

//     const handleAction = () => {
//         if (action === 'active') {
//             console.log(action)
//             // handleStart()
//         }
//         if (action === 'paused') {
//             console.log(action)
//             handlePause()
//         }
//         if (action === 'stop') {
//             console.log(action)
//             handlePause()
//         }
//     }

//     return (
//         <div className="Stopwatch">
//             <div className='stopwatch-card'>
//                 <p>⏱️{formatTime()}</p>
//                 {handleAction()}
//                 {/* <div className='buttons'>
//           {
//             !isActive && !isPaused ?
//               <button onClick={handleStart}>Start</button>
//               : (
//                 isPaused ? <button onClick={handlePause}>Pause</button> :
//                   <button onClick={handleResume}>Resume</button>
//               )
//           }
//           <button onClick={handleReset} disabled={!isActive}>Reset</button>
//         </div> */}
//             </div>
//         </div>
//     );
// }

// export default Stopwatch;

import React, { useState, useEffect } from "react";

export default function Stopwatch(props) {
  const [timer, setTimer] = useState(0);
  const gameStatus = props.gameState;
  const [gameState, setGameState] = useState(props.gameState);

  const getTime = () => {
    let seconds = timer;
    let minutes = timer % 60;
    let hours = timer % 3600;
    let time = hours + ":" + minutes + ":" + seconds;
    return time;
  };

  var time = 0;
  const handleStopwatchStart = () => {
    console.log("gameStatus", gameStatus);
    if (gameStatus === "active") {
      console.log("PLAY", time, timer);
      time = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      // clearInterval(time)
    }
    if (gameStatus === "paused" && gameStatus !== "active") {
      handleStopwatchPause();
    }
  };

  const handleStopwatchPause = () => {
    console.log("PAUSE", timer);

    clearInterval(time);
  };

  // useEffect(() => { handleStopwatchStart() }, [gameStatus])

  return (
    <div className="stopwatch">
      clock:{timer}
      {handleStopwatchStart()}
    </div>
  );
}
