import React from 'react'
import timeline from '../../manage/timeline'
import colorManage from '../../manage/colormanager'
import moment from 'moment/moment'
import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';
import {GrStatusCriticalSmall} from 'react-icons/gr'
import capacityManage from '../../manage/capacitymanager';

//EACH HOUR IS 40 AND EACH DAY IS 960
const TimelineHeader = () => {
  //scroll to current date
  useEffect(() => {
    const timelineX = document.getElementById('hourTimeline');

    let day = moment().dayOfYear();
    let hour = moment().hour();

    const  getTimelinePos = timeline.figureHourPos(day, hour);

    timelineX.scrollTo({
      left: getTimelinePos,
      behavior: 'smooth'
    });

  }, []);
   
  const hoursOfTheYear = () => {
    let hours = timeline.hoursOfTheDay()


    return hours.map((hour, index)=>{
      return (
        <div 
        key={index}
        className='
        bg-blue-500 text-xs px-1 w-10 outline
        outline-blue-800 outline-2 font-bold'>
          <p>{hour}</p>
        </div>
      )
    })
  }

  // Gives out how many day of each month during given year
  const daysOfTheYear = (year,month) => {
   //const monthIndex = {January:0, February:1, March:2, }
   const monthsList = moment.months();
   let monthDayAr = [];
   let monthDayCount = timeline.daysOfTheMonth(year)
   let monthIndex = monthsList.indexOf(month)
   let daysCurMonth = monthDayCount[monthIndex]

   for (let d = 1; d<=daysCurMonth; d++) {
     monthDayAr.push(d)
   }

    return monthDayAr.map((day, index)=> {
        return (
         <div 
           key={index} 
           className='
           bg-blue-500 text-md outline
           outline-blue-800 outline-2'>

           <p> {day} </p>
            <div className='flex'>
              {hoursOfTheYear()}
            </div>
           <div>

           </div>
         </div>
        );
     });
}


 const timelineHead = () => {
   let months = moment.months();
   let monthData = months.map(month => {
     return (
         <div key={month} className=' bg-blue-800 outline-dashed outline-2 font-semibold'>
             {/* <p> {month} </p> */}
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

const TaskList = ({loadedTasks,capacity}) => {
  const splitDate = (date) => {
    return date.split(' ')
  }

  const getToCompleteTime = (start,end,duration) =>{
    let days = timeline.taskLenght(start,end)
    return capacityManage.capacityToDays(capacity,duration,days)
   }

  const getToolTipCont = (bool) =>{
    let string = "Posssible"
      if(bool === "true"){
        string = "Not Posssible"
      }
    return string
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
          let taskPsbl = capacityManage.ifPossible(capacity,task.startdate,task.deadline,task.duration)
          let tooltipString = getToCompleteTime(task.startdate,task.deadline,task.duration)
          return(
            <div 
              key={index} 
              className='flex justify-between outline outline-blue-500 outline-1 bg-slate-700 text-white text-lg py-2 px-4'
            >
              <p>{task.title}</p>
              <p
              data-tip = {tooltipString}
              data-for="possible"
              style={{color:colorManage.possibilityColor(taskPsbl)}}>
                <GrStatusCriticalSmall/>
              </p>
              <ReactTooltip 
              id='possible' 
              aria-haspopup='true'
              getContent={(dataTip) => <div>Time needed: {dataTip} days</div>} />
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

const TimelineBody = ({loadedTasks, capacity, workHours}) => {


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
        let dayCount = timeline.taskLenght(task.startdate, task.deadline);
        let dayStart = timeline.startDateToDay(task.startdate);
        let workDays = timeline.workDays(capacity,task.duration);
        return(
          <div 
            key={index} 
            className='outline outline-blue-800 outline-2 bg-gray-50 text-black flex-1 text-lg relative w-80 py-2'
            // the param is how wide each sqaure is. so each hour is 40px, making each day 40*24=960 
            style={{width: timeline.timelineDailyLen(960)}}>
            <div
              data-tip={task.title}
              data-for="task"
              className='outline outline-blue-800 outline-2 bg-blue-500 text-white
                         flex-1 text-lg relative overflow-hidden text-ellipsis whitespace-nowrap'
              style={{
                left: timeline.figureHourPos(dayStart,0),
                width: timeline.figureHourPosEnd(dayCount,0),
                backgroundColor: colorManage.statusColor(task.status)}}
              >
              <div className='flex'>
              {workDays.map((item, index) => (
                <div 
                  key={index}
                  className="bg-blue-900 pl-1 relative outline outline-red-800 outline-2 " 
                  style={{
                    left:timeline.workDaysPos(workHours[0],index,capacity),
                    width: timeline.figureHourPosEnd(0,item)}}>
                  <p>{item}H</p>
                </div>
              ))}
              </div>

            </div>
            <ReactTooltip 
              id="task" 
              place="top" 
              effect="float" 
              getContent={(dataTip) => <div> <h1>{dataTip}</h1></div>}/>
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

const CurrentMonth = () =>{
  const [month, setMonth] = useState("")
  
  useEffect(() => {
    const timelineX = document.getElementById('hourTimeline');
    const scrollEvent = () => {
      let curMonth = timeline.monthPos(timelineX.scrollLeft)
      setMonth(curMonth)
    }

    timelineX.addEventListener("scroll", scrollEvent)
  }, [])
  
  return(
    <>
    <div className='flex justify-center bg-blue-700 text-white'>
      <h1>{month}</h1>
    </div>
    </>
  )
}

const TimelineHourly = ({loadedTasks, capacity, workHours}) => {
    
  return (
    <div>
      <div className='flex flex-row-reverse justify-between'>
        <div className='w-full'>
          <CurrentMonth/>
        </div>
        
        <div
        style={{minWidth: 192}}
        className="bg-slate-700"
        >
           {/* empty div */}
        </div>

      </div>
      <div className='flex flex-row-reverse'>
        
      <div
        id="hourTimeline"
        className='max-w-screen-xs overflow-x-scroll scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300'>

          <TimelineHeader />
          <TimelineBody 
            loadedTasks={loadedTasks}
            capacity={capacity}
            workHours={workHours}
          />

      </div>
      <div>
        <div className='
        bg-slate-700 font-bold outline text-white w-48
          text-center outline-blue-800 outline-1 pb-4'>
          <h2>Task List</h2>
        </div>
          <TaskList loadedTasks={loadedTasks} capacity={capacity} />
      </div>
    </div>
  </div>
  )
}

export default TimelineHourly