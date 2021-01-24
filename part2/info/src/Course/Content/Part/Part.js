import React from 'react';

const Part = (props) => {
    return (
      props.course.parts.map (part => <p key={part.id} >{part.name} {part.exercises}</p>)
    )
  }

export default Part