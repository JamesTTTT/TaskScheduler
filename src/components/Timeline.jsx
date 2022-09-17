import React from 'react'
import moment from 'moment'
import { useState } from 'react'

//EACH DAY IS 24
const TimelineHeader = ({loadedTasks}) => {
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
            <div 
              key={index} 
              className='bg-blue-500 text-xs px-1 outline outline-blue-800 outline-2 w-6 font-bold'>
              <p> {day} </p>
            </div>
           );
        });
   }


    const timelineHead = () => {
      let months = moment.months();
      let monthData = months.map(month => {
        return (
            <div key={month} className=' bg-blue-700 outline-dashed outline-2'>
                <p>{month}</p>
                <div className='flex'>
                  {daysOfTheYear(2022,month)}
                </div>
            </div>
        );
      });
      return monthData
    }

    return(
      <>
        <div className='flex flex-row text-white justify-start text-center'>
          {timelineHead()}
        </div>
      </>
    )
}

const TimelineBody = ({loadedTasks}) => {

  const figurePosX = (day) =>{
    //EACH DAY IS 24px
    return day * 24 - 24
  }

  const startDateToDay = (date) => {
    
  }

  const taskRows = (y) => {
    let year = y.toString()
    if(loadedTasks){
      return loadedTasks
      // .filter(task => {
      //   let dateArr = splitDate(task.startdate)
      //   //console.log(dateArr)
      //     if(dateArr[3] === year){
      //       return task
      //     }
      // })
      .map((task, index) =>{
        return(
          <div 
            key={index} 
            className='outline outline-blue-800 outline-2 bg-blue-200 text-black flex-1 text-lg relative w-80 py-2'
            style={{width: 8784}}>
            <div
              className='outline outline-blue-800 outline-2 bg-blue-500 text-white flex-1 text-lg relative w-80 rounded-xl pl-2'
              style={{left: figurePosX(30)}}
              >
              <p>{task.title}</p>
            </div>
          </div>
        )
      })
    }
}

  return(
    <>
      {/* <div className='w-full bg-blue-800'
      style={{width: 8784}}> */}
      <div>
        {taskRows(2022)}
      </div>
    </>
  )
}


const TaskList = ({loadedTasks}) => {
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
              className='outline outline-blue-800 outline-1 bg-blue-500 text-white text-lg py-2 px-4'
            >
              <p>{task.title}</p>
            </div>
          )
        })
      }
  }
  return (
    <div>
      {taskList(2022)}
    </div>
  )
}


const Timeline = ({loadedTasks}) => {



    return (
      <>
        <h1 className='text-center text-2xl'>Timeline</h1>
        <div className='flex flex-row-reverse'>
          <div className='max-w-screen-xs overflow-x-scroll'>

              <TimelineHeader loadedTasks={loadedTasks}/>
              <TimelineBody loadedTasks={loadedTasks}/>

          </div>
          <div>
            <div className='bg-blue-900 text-white w-48 text-center pb-4'>
              <h2>Task List</h2>
            </div>
              <TaskList loadedTasks={loadedTasks} />
          </div>
        </div>
      </>
    )
}

export default Timeline