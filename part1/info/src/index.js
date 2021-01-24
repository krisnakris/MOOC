import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <p>
        <Part part={props.part.parts[0].name} exercises={props.part.parts[0].exercises} />
        <Part part={props.part.parts[1].name} exercises={props.part.parts[1].exercises} />
        <Part part={props.part.parts[2].name} exercises={props.part.parts[2].exercises} />
      </p>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Number of exercise {props.part.parts[0].exercises + props.part.parts[1].exercises  + props.part.parts[2].exercises }</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course= {course} />
      <Content part= {course} />
      <Total part = {course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
