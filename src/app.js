import { Component } from "react";
import { createRoot } from "react-dom/client";

import {
  MdOutlineRestore,
  MdPlayCircleOutline,
  MdPauseCircleOutline,
  MdArrowCircleUp,
  MdOutlineHourglassEmpty,
  MdArrowCircleDown,
} from "react-icons/md";
import "./style.css";
let x = 0;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      minutes: 1500,
      isrunning: false,
      isSession: true,
      intervalId: "",
    };
  }

  decreaseBreak = () => {
    if (this.state.break > 1 && !this.state.isrunning)
      this.setState({ break: this.state.break - 1 });
  };

  increaseBreak = () => {
    if (this.state.break < 60 && !this.state.isrunning)
      this.setState({ break: this.state.break + 1 });
  };

  decreaseSession = () => {
    if (this.state.session > 1 && !this.state.isrunning)
      this.setState({
        session: this.state.session - 1,
        minutes: (this.state.session - 1) * 60,
      });
  };
  increaseSession = () => {
    if (this.state.session < 60 && !this.state.isrunning)
      this.setState({
        session: this.state.session + 1,
        minutes: (this.state.session + 1) * 60,
      });
  };

  startTimer = () => {
    if (!this.state.isrunning) {
      let x = setInterval(() => {
        if (this.state.minutes > 0)
          this.setState({ minutes: this.state.minutes - 1, isrunning: true });
        else {
          ///mins===0
          document.getElementById("beep").play();
          const newMinute = this.state.isSession
            ? this.state.break * 60
            : this.state.session * 60;
          this.setState({
            minutes: newMinute,
            isrunning: true,
            isSession: !this.state.isSession,
          });
        }
      }, 1000);

      this.setState({ intervalId: x });
    } else {
      clearInterval(this.state.intervalId);
      this.setState({ isrunning: false });
    }
  };

  resetTimer = () => {
    clearInterval(this.state.intervalId);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState({
      break: 5,
      session: 25,
      minutes: 1500,
      isrunning: false,
      isSession: true,
      intervalId: "",
    });
  };

  formatTime = (time) => {
    var mins = Math.floor(time / 60);
    let sec = time % 60;

    mins = mins < 10 ? "0" + mins : mins;
    sec = sec < 10 ? "0" + sec : sec;

    if (time < 60) x = true;
    else x = false;

    return `${mins}:${sec}`;
  };

  render() {
    const { minutes } = this.state;
    return (
      <div className="box">
        <h1 id="title">25+5 Clock</h1>
        <div id="main-container">
          <Break
            break={this.state.break}
            decreaseBreak={this.decreaseBreak}
            increaseBreak={this.increaseBreak}
          />
          <Session
            session={this.state.session}
            increaseSession={this.increaseSession}
            decreaseSession={this.decreaseSession}
          />
        </div>
        <section id="timer">
          <h1 id="timer-label">{this.state.isSession ? "Session" : "Break"}</h1>
          <MdOutlineHourglassEmpty size={35} />
          <h2 id="time-left" style={{ color: minutes > 59 ? "#fff" : "#f00" }}>
            {this.formatTime(minutes)}
          </h2>
          <div className="main-controls">
            <button
              id="start_stop"
              className="fancy-btn"
              onClick={this.startTimer}
            >
              {this.state.isrunning ? (
                <MdPauseCircleOutline color="#fff" size={35} />
              ) : (
                <MdPlayCircleOutline color="#fff" size={35} />
              )}
            </button>

            <button id="reset" className="fancy-btn" onClick={this.resetTimer}>
              <MdOutlineRestore color="#fff" size={35} />
            </button>
          </div>
        </section>
      </div>
    );
  }
}

function Break(props) {
  return (
    <div className="control-box">
      <h2 id="break-label">Break Length</h2>
      <div className="controls">
        <button
          id="break-decrement"
          onClick={props.decreaseBreak}
          className="fancy-btn"
        >
          <MdArrowCircleDown color="#fff" size={35} />
        </button>

        <span id="break-length">{props.break}</span>

        <button
          id="break-increment"
          onClick={props.increaseBreak}
          className="fancy-btn"
        >
          <MdArrowCircleUp color="#fff" size={35} />
        </button>
      </div>
    </div>
  );
}
function Session(props) {
  return (
    <div className="control-box">
      <h2 id="session-label">Session Length</h2>

      <button
        id="session-decrement"
        onClick={props.decreaseSession}
        className="fancy-btn"
      >
        <MdArrowCircleDown color="#fff" size={35} />
      </button>
      <span id="session-length">{props.session}</span>

      <button
        id="session-increment"
        onClick={props.increaseSession}
        className="fancy-btn"
      >
        <MdArrowCircleUp color="#fff" size={35} />
      </button>
    </div>
  );
}

const renderer = createRoot(document.querySelector("#root"));

renderer.render(<App />);
