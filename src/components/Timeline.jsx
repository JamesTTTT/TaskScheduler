import React from 'react'
import moment from 'moment'
import colorManage from '../manage/colormanager'
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
            <div key={month} className=' bg-blue-800 outline-dashed outline-2 font-semibold'>
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
    return day * 24 - 12
  }

  const startDateToDay = (date) => {
    let now = new Date(date)
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    return figurePosX(day)
  }

  const taskLenght = (start, end) => {
    let startdate = new Date(start)
    let deadline = new Date(end)
    let difference = deadline.getTime() - startdate.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    console.log("t:"+TotalDays)
    if(TotalDays <= 1){
      return 24
    }
    return figurePosX(TotalDays)
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
            className='outline outline-blue-800 outline-2 bg-gray-50 text-black flex-1 text-lg relative w-80 py-2'
            style={{width: 8784}}>
            <div
              className='outline outline-blue-800 outline-2 bg-blue-500 text-white
                         flex-1 text-lg relative rounded-xl pl-2 overflow-hidden text-ellipsis whitespace-nowrap'
              style={{
                left: startDateToDay(task.startdate),
                width: taskLenght(task.startdate, task.deadline),
                backgroundColor: colorManage.statusColor(task.status)}}
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
              className='outline outline-blue-500 outline-1 bg-slate-700 text-white text-lg py-2 px-4'
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
            <div className='bg-slate-700 font-bold outline text-white w-48 text-center outline-blue-800 outline-1 pb-4'>
              <h2>Task List</h2>
            </div>
              <TaskList loadedTasks={loadedTasks} />
          </div>
        </div>
      </>
    )
}

export default Timeline