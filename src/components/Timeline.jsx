import React from 'react'
import moment from 'moment'
import { useState } from 'react'


const TimelineBody = ({loadedTasks}) => {
     // Gives out how many day of each month during given year
     const daysOfTheMonth = (y) =>{

      let daysInMonths = [];
      let yearMonth = "";
      for (let mon = 1; mon<=12; mon++) {
        yearMonth = y.toString()+"-0"+mon.toString()
        const numDaysInMonth = moment(yearMonth, "YYYY-MM").daysInMonth();
        daysInMonths.push(numDaysInMonth)
      }
      return daysInMonths

    }

    const daysOfTheYear = (year,month) => {
      //const monthIndex = {January:0, February:1, March:2, }
      const monthsList = moment.months();
      let monthDayAr = [];
      let monthDayCount = daysOfTheMonth(year)
      let monthIndex = monthsList.indexOf(month)
      let daysCurMonth = monthDayCount[monthIndex]

      for (let d = 1; d<=daysCurMonth; d++) {
        monthDayAr.push(d)
      }

       return monthDayAr.map((day, index)=> {
           return (
            <th key={index} className=' bg-blue-500 text-xs px-1 border-solid border-blue-800 border-x-2'>
              <tr> {day} </tr>
            </th>
           );
        });
   }

   const timeLineRows = () => {
      return loadedTasks.map((item, index) => {
        return(
          <tr key={index} className="bg-blue-200">
            <td> {item.title}</td>
            <td> Task2</td>
          </tr>
        )
      })
   }

    const timelineBody = () => {
      let months = moment.months();
      let monthNames = months.map(month => {
        return (
            <th key={month} className=' bg-blue-700 text-center border-white border-x-2'>
                <tr>{month}</tr>
                <table>
                  {daysOfTheYear(2022,month)}
                  {timeLineRows()}
                </table>
            </th>
        );
      });
      return monthNames
    }

    return(
      <>
        <table className=' text-white justify-start text-center'>
          {timelineBody()}
        </table>
      </>
    )
}

// const TimelineBody = ({loadedTasks}) => {



//   return(
//     <>
//       {tasks()}
//     </>
//   )
// }

const Timeline = ({loadedTasks}) => {

    const splitDate = (date) => {
      return date.split(' ')
    }

    const taskList = (y) => {
        let year = y.toString()
        if(loadedTasks){
          return loadedTasks
          .filter(task => {
            let dateArr = splitDate(task.startdate)
            //console.log(dateArr)
              if(dateArr[3] === year){
                return task
              }
          }).map((task, index) =>{
            return(
              <div 
                key={index} 
                className='border-t-2 border-blue-800 bg-blue-500 text-white'
              >
                <p>{task.title}</p>
              </div>
            )
          })
        }
    }

    return (
      <>
        <h1 className='text-center text-2xl'>Timeline</h1>
        <div className='flex flex-row-reverse'>
          <div className='max-w-screen-xs overflow-x-scroll'>

              <TimelineBody loadedTasks={loadedTasks}/>
              {/* <TimelineBody/> */}

          </div>
          <div>
            <div className='bg-blue-800 text-white w-36'>
              <h2>Task List</h2>
              <p>.</p>
            </div>
            <div>
              {taskList(2022)}
            </div>
          </div>
        </div>
      </>
    )
}

export default Timeline