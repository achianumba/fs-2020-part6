import React from 'react';
import ReactDOM from "react-dom";
import "./index.css";
import { createStore } from "redux";
import reducer from "./reducer";
/*
=====================
Store
=====================
*/
const store = createStore(reducer);
/*
=====================
App
=====================
*/
const App = () => {
  //App state and variables
  let stats = store.getState();
  let { good, okay, bad } = stats;
  let all = good + okay + bad;
  let positive = (good / all) * 100;
  let average = ((good - bad) / all) * 100;

  const clickHandler = (e) => {
    e.preventDefault();
    
    store.dispatch({ 
      type: e.target.textContent.toUpperCase()
    });
  };

  return (
    <main id="main">
      <h1 id="question">How would you rate our services?</h1>

      <div id="btn-container" onClick={clickHandler}>
        <Button text="Good" addClass="btn-good" />
        <Button text="Okay" addClass="btn-neutral" />
        <Button text="Bad" addClass="btn-bad" />
      </div>

      <NoFeedback all={all} />

      <Statistics
        good={ good }
        okay={ okay }
        bad={ bad }
        clickHandler={clickHandler}
        all={all}
        positive={positive}
        average={average}
      />
    </main>
  );
};
/*
=====================
Button
=====================
*/
const Button = ({ text, addClass }) => (
  <button className={"btn " + addClass}>{text}</button>
);
/*
=====================
StatisticS
=====================
*/
const Statistics = ({ good, okay, bad, all, positive, average }) => {
  return (
    <table className={all < 1 ? "hide" : "statistics"}>
      <caption>Statistics</caption>
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Okay" value={okay} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={all} />
        <Statistic
          text="Average"
          value={
            isNaN(average) || average === Infinity ? 0 : average.toFixed(2)
          }
        />
        <Statistic
          text="Positive"
          value={
            isNaN(positive) || positive === Infinity
              ? 0 + "%"
              : positive.toFixed(2) + "%"
          }
        />
      </tbody>
    </table>
  );
};
/*
=====================
Statistic
=====================
*/
const Statistic = ({ text, value }) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
);
/*
=====================
NoFeedback
=====================
*/
const NoFeedback = ({ all }) => (
  <div className={all < 1 ? "no-feedback" : "hide"}>
    <h2>No feedback given</h2>
    <p>
      Give us some feedback about our services
      <br />
      by clicking a button above.
    </p>
  </div>
);


const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
}

renderApp();

store.subscribe(renderApp);