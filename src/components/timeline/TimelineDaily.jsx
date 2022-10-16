import React from 'react'
import moment from 'moment'
import colorManage from '../../manage/colormanager'
import timeline from '../../manage/timeline';
import {GrStatusCriticalSmall} from 'react-icons/gr'
import capacityManage from '../../manage/capacitymanager';
import ReactTooltip from 'react-tooltip';
import { useEffect } from 'react';

//EACH DAY IS 24
const TimelineHeader = ({renderYear}) => {

  useEffect(() => {
    const timelineX = document.getElementById('dayTimeline');

    let day = moment().dayOfYear();
    const  getTimelinePos = timeline.figurePosX(day);

    timelineX.scrollTo({
      left: getTimelinePos,
      behavior: 'smooth'
    });

  }, []);

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
                 {daysOfTheYear(renderYear,month)}
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

const TimelineBody = ({loadedTasks,capacity,renderYear,ocpHours}) => {
  
  const splitDate = (date) => {
    return date.split('-')
  }

  const getToCompleteTime = (start,end,duration) =>{
    let days = timeline.taskLenght(start,end)
    let taskDays = capacityManage.capacityToDays(capacity,duration,days)
    let fill = timeline.figurePosEnd(taskDays)
    return fill
   }

 const taskRows = (y) => {
   let year = y.toString()
   if(loadedTasks){
     return loadedTasks
     .filter(task => {
       let dateArr = splitDate(task.startdate)
         if(dateArr[0] === year){
           return task
         }
     })
     .map((task, index) =>{
        // Get how many days between two dates
        const taskTimeData = ocpHours.find((t) => t.id === task.id);
        
        let algDays = [];
        let dayCount = timeline.taskLenght(task.startdate, task.deadline);
        let dayStart = timeline.startDateToDay(task.startdate);
        if(taskTimeData){
          algDays = timeline.algDays(taskTimeData);
        }
       return(
         <div 
           key={index} 
           className='outline outline-blue-800 outline-2 bg-gray-50 text-black flex-1 text-lg relative w-80'
           // the param is how wide each sqaure is. so each day is 24px
           style={{width: timeline.timelineDailyLen(24)}}>
          
           <div
             data-tip={task.title}
             data-for="task"
             className=' Pattern outline outline-blue-800 outline-2 bg-blue-500 text-white overflow-visible
                        flex-1 text-lg relative text-ellipsis whitespace-nowrap flex flex-row'
             style={{
               left: timeline.figurePosX(dayStart),
               width: timeline.figurePosEnd(dayCount),
               //backgroundColor: colorManage.statusColor(task.status)
              }}
             >
              {algDays.map((item, index) => (
              <div 
              key={index}
              className="bg-blue-900 pl-1 relative 
              outline outline-blue-700 outline-2 py-2" 
              style={{
                width: 24,
                left:timeline.algDayPos(item, task.startdate, index),
                backgroundColor: colorManage.statusColor(task.status)
                }}>
                <p className='py-0 h-7'>
                </p>
              </div>
             ))}
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
       {taskRows(renderYear)}
     </div>
   </>
 )
}


const TaskList = ({loadedTasks, capacity, ocpHours,renderYear}) => {
 const splitDate = (date) => {
   return date.split('-')
 }

 const getToCompleteTime = (start,end,duration) =>{
  let days = timeline.taskLenght(start,end)
  return capacityManage.capacityToDays(capacity,duration,days)
 }



 const taskList = (y) => {

     let year = y.toString()
     if(loadedTasks){
       return loadedTasks
       .filter(task => {
         let dateArr = splitDate(task.startdate)
         //console.log(dateArr)
           if(dateArr[0] === year){
             return task
           }
       })
      .map((task, index) =>{
        const taskTimeData = ocpHours.find((t) => t.id === task.id);
        let taskPsbl = false;
        if(taskTimeData){
          taskPsbl = capacityManage.algCheckPossible(taskTimeData, task.deadline);
        }
        //let taskPsbl = capacityManage.algCheckPossible(taskTimeData, task.deadline);
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
     {taskList(renderYear)}
   </div>
 )
}

const TimelineDaily = ({loadedTasks, capacity, ocpHours, renderYear}) => {
  return (
    <div className='flex flex-row-reverse'>
        <div 
          id="dayTimeline"
          className='max-w-screen-xs overflow-x-scroll scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300'>
            <TimelineHeader 
              renderYear={renderYear}
              />
            <TimelineBody
              ocpHours={ocpHours}
              loadedTasks={loadedTasks} 
              capacity={capacity}
              renderYear={renderYear}
            />
        </div>
    <div>
      <div className='bg-slate-700 font-bold outline text-white w-48 text-center outline-blue-800 outline-1 pb-4'>
        <h2>Task List</h2>
      </div>
        <TaskList 
          loadedTasks={loadedTasks} 
          capacity={capacity} 
          ocpHours={ocpHours}
          renderYear={renderYear}
        />
    </div>
  </div>
  )
}

export default TimelineDaily