import React, { useReducer } from "react";
import './MainBody.css';

const initialState = {
  red: 0,
  blue: 0,
  green: 0,
  moves: 0,
  tokens: 10,
  winningsClicked: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "random":
      return {
        red: Math.floor(Math.random() * 4 + 1),
        blue: Math.floor(Math.random() * 4 + 1),
        green: Math.floor(Math.random() * 4 + 1),
        moves: 0,
        tokens: state.tokens - 1,
        winningsClicked: false,
      };
    case "1":
      return {
        red: Math.floor(Math.random() * 4 + 1),
        blue: state.blue,
        green: state.green,
        moves: state.moves + 1,
        tokens: state.tokens,
        winningsClicked: state.winningsClicked,
      };
    case "2":
      return {
        red: state.red,
        blue: Math.floor(Math.random() * 4 + 1),
        green: state.green,
        moves: state.moves + 1,
        tokens: state.tokens,
        winningsClicked: state.winningsClicked,
      };
    case "3":
      return {
        red: state.red,
        blue: state.blue,
        green: Math.floor(Math.random() * 4 + 1),
        moves: state.moves + 1,
        tokens: state.tokens,
        winningsClicked: state.winningsClicked,
      };
    case "winner":
      return {
        red: state.red,
        blue: state.blue,
        green: state.green,
        moves: state.moves,
        tokens: state.tokens + 5,
        winningsClicked: true,
      };
    default:
      return {
        red: state.red,
        blue: state.blue,
        green: state.green,
        moves: state.moves,
        tokens: state.tokens,
        winningsClicked: state.winningsClicked,
      };
  }
};

const playButton = (state) => {
  if (state.tokens === 0) {
    return "Out Of Tokens";
  } else if (state.red === 0 && state.blue === 0 && state.green === 0) {
    return "Play";
  } else {
    return "Play Again";
  }
};

const showButtons = (state) => {
  if (playButton(state) === "Play") {
    return true;
  }
  if (state.moves >= 2) {
    return true;
  } else {
    return false;
  }
};

const showWinnings = (state) => {
  if (
    state.red === state.blue &&
    state.red === state.green &&
    state.red > 0 &&
    state.winningsClicked === false
  ) {
    return false;
  } else {
    return true;
  }
};

const MainBody = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div id="display">
        <p className="spinner">{state.red}</p>
        <p className="spinner">{state.blue}</p>
        <p className="spinner">{state.green}</p>
      </div>

      <div id="nudgeBtns">
        <button className="nudge"
          disabled={showButtons(state)}
          onClick={() => dispatch({ type: "1" })}
        >
          Nudge
        </button>
        <button className="nudge"
          disabled={showButtons(state)}
          onClick={() => dispatch({ type: "2" })}
        >
          Nudge
        </button>
        <button className="nudge"
          disabled={showButtons(state)}
          onClick={() => dispatch({ type: "3" })}
        >
          Nudge
        </button>
      </div>
      <div id="controls">
        <p id="tokens">Tokens: {state.tokens}</p>
        <div id="controlBtns">
        <button className="bottomBtns"
          disabled={showWinnings(state)}
          onClick={() => dispatch({ type: "winner" })}
        >
          Collect Winnings
        </button>
        <button className="bottomBtns"
          disabled={playButton(state) === "Out Of Tokens"}
          onClick={() => dispatch({ type: "random" })}
        >
          {playButton(state)}
        </button>
        </div>
      </div>
    </>
  );
};

export default MainBody;
