import React from "react";
import ReactDOM from "react-dom";

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      greeting app created by <a href = "https://github.com/krisnakris">Krisna</a>
    </div>
  )
}

const App = () => {
  
  return (
  <>
    <div>
      <div>
        <h1>Greetings</h1>
        <Hello name="Geroge" age = {26 + 10} />
        <Footer />
      </div>
    </div>
  </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
