import React from 'react';
import Header from './Header/Header'
import Content from './Content/Content'
import Total from './Content/Total'

const Course = (props) => {
  return (
    <div>
      {
        props.course.map(function (course) {
         return( 
         <div> 
            <Header course = {course}/>
            <Content course= {course}/>
            <Total course = {course}/>
          </div>
          )
        })
      }

    </div>
  )
}

export default Course