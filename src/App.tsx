import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import Confetti from 'react-confetti'
import './App.css';


export default function App() {

  // state variables
  const [isConnected, setIsConnected] = useState(true);

  /*
  const quotes = {
    1: {
      quote: "The chief task in life is simply this: to identify and separate matters so that I can say clearly to myself which are externals not under my control, and which have to do with the choices I actually control. Where then do I look for good and evil? Not to uncontrollable externals, but within myself to the choices that are my own",
      author: "Epictetus"
    },
    3: {
      quote: "",
      author: ""
    }
  };
  */

  const {
    hours,
    minutes,
    seconds,
    start,
    reset,
  } = useStopwatch({ autoStart: true });

  useEffect(() => {

    // get and set interval id for later
    let intervalId = setInterval(setConnection, 1000);

    // reset timer
    reset();

    // start 
    if (isConnected)
      start();

    return function cleanup() {
      // remove interval
      clearInterval(intervalId);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);


  // check if device is connected
  function setConnection() {
    setIsConnected(window.navigator.onLine);
  }

  // force two digits: 1 -> 01
  function formatNum(num: number) {
    return(num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }));
  }

  function showHiddenContent() {

    const timeString = `${formatNum(hours)}:${formatNum(minutes)}:${formatNum(seconds)}`;

    return(
      <div>
        <Confetti 
          className='confetti' 
          recycle={false} 
          numberOfPieces={350} 
          width={window.innerWidth}
          confettiSource={{x: 0, y: window.innerHeight, w: window.innerWidth, h: 50}}
          initialVelocityY={40}
          tweenDuration={10000}
          gravity={0.1}
        />
        <div className="text"><b>{timeString}</b></div>
        <div className="text">
          <p>You're completely disconnected from the rest of the world right now. Take some time to enjoy the moment, you've earned this.</p>
          <div className="divider"></div>
          <p className="quote">
            <i>
            True happiness is to enjoy the present, without anxious dependence upon the future, not to amuse ourselves with either hopes or fears but to rest satisfied with what we have, which is sufficient
            </i>
            <br/>
            <br/>
            <i>
              – Seneca 
            </i>
          </p>
        </div>
      </div>
    );

  }

  function showContent(){

    // show message
    return(
      <div 
        className={isConnected ? 'wrapper connected' : 'wrapper disconnected'}
        // onClick={() => setIsConnected(!isConnected)}
      >
        {isConnected && 
          <div className="connected-message text">
            Disconnect from the internet to continue 
          </div>
        }
        {!isConnected && showHiddenContent()}
      </div>
    );

  }

  return (
    showContent()
  );
}

