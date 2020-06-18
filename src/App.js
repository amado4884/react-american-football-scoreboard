//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import BottomRow from "./BottomRow";
import "./App.css";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [down, setDown] = useState(3);
  const [toGo, setToGo] = useState(7);
  const [ballOn, setBallOn] = useState(21);
  const [quarter, setQuarter] = useState(4);
  const [timer, setTimer] = useState("15:00");
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(Date.now());

  setInterval(() => {
    setTime(Date.now() - start);
  }, 1000);

  useEffect(() => {
    let seconds = Math.floor(time / 1000);
    let minutes = 0 - Math.floor(seconds / 60);
    if (minutes < 0) {
      setTimer("00:00");
      return;
    }
    seconds = 60 - (seconds % 60);
    seconds = seconds === 60 ? 0 : seconds;
    minutes = time < 1000 ? 1 : minutes;
    setTimer(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
  }, [time]);

  const scoreHandler = (teamName, amount) => {
    if (teamName === "Lions") setHomeScore(homeScore + amount);
    else if (teamName === "Tigers") setAwayScore(awayScore + amount);
  };

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}
            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{timer}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow down={down} toGo={toGo} ballOn={ballOn} quarter={quarter} />
      </section>
      <section className="buttons">
        <div className="topRow">
          <div className="homeButtons">
            {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
            <button className="homeButtons__touchdown" onClick={() => scoreHandler("Lions", 7)}>
              Home Touchdown
            </button>
            <button className="homeButtons__fieldGoal" onClick={() => scoreHandler("Lions", 3)}>
              Home Field Goal
            </button>
          </div>
          <div className="awayButtons">
            <button className="awayButtons__touchdown" onClick={() => scoreHandler("Tigers", 7)}>
              Away Touchdown
            </button>
            <button className="awayButtons__fieldGoal" onClick={() => scoreHandler("Tigers", 3)}>
              Away Field Goal
            </button>
          </div>
        </div>
        <div className="bottomRow">
          <div className="homeButtons__touchdown">
            <button className="increase" onClick={() => setDown(down + 1)}>
              Increase Down
            </button>
            <button className="decrease" onClick={() => setDown(down - 1)}>
              Decrease Down
            </button>
          </div>
          <div className="homeButtons__touchdown">
            <button className="increase" onClick={() => setToGo(toGo + 1)}>
              Increase To Go
            </button>
            <button className="decrease" onClick={() => setToGo(toGo - 1)}>
              Decrease To Go
            </button>
          </div>
          <div className="homeButtons__touchdown">
            <button className="increase" onClick={() => setBallOn(ballOn + 1)}>
              Increase Ball On
            </button>
            <button className="decrease" onClick={() => setBallOn(ballOn - 1)}>
              Decrease Ball On
            </button>
          </div>
          <div className="homeButtons__touchdown">
            <button
              className="increase"
              onClick={() => {
                setQuarter(quarter + 1);
              }}
            >
              Increase Quarter
            </button>
            <button
              className="decrease"
              onClick={() => {
                setQuarter(quarter - 1);
              }}
            >
              Decrease Quarter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
