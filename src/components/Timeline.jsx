import React from 'react'
import moment from 'moment'
import { useState } from 'react'


const Timeline = (loadedTasks) => {

    const [dateObj, setDateObj] = useState({
      dateObject: moment()
    })

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
             <div key={index}>
             <div className=' bg-blue-500 text-xs px-1 border-solid border-blue-800 border-x-2'>
               <p>
                 {day}
               </p>
             </div>
           </div>
           );
        });
   }

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

    // const dateTask = (date) => {
    //   let allTasks = loadedTasks.map(task => {
    //     let shortendDate = 0;
    //     if (task.startdate === date) {
    //         return task
    //     }  
    //   })
    //   return allTasks
    // }

    const firstDayOfMonth = () => {

      let dateObject = dateObj;
      let firstDay = moment(dateObject)
                   .startOf("month")
                   .format("d"); 
     return firstDay;
    };

    const week = () => {
       let weekdayshort = moment.weekdaysShort();
        return weekdayshort.map(day => {
            return (
              <div key={day}>
              <div className=' bg-blue-500 text-sm px-1 border-solid border-blue-800 border-x-2'>
                <p>
                  {day}
                </p>
              </div>
            </div>
            );
         });
    }

    const monthDisplay = () => {
      let months = moment.months();
      let monthNames = months.map(month => {
        return (
          <div key={month}>
            <div className=' bg-blue-700 text-center border-white border-x-2'>
                {month}
                <div className='flex'>

                  {daysOfTheYear(2022,month)}
                </div>
            </div>
          </div>
        );
      });
      return monthNames
    }

    return (
      <div>
        <p>Timeline</p>
      <div className='flex text-white justify-start max-w-screen-xs overflow-x-scroll'>
        {monthDisplay()}
      </div>  
      
      {firstDayOfMonth()}
      </div>
    )
}

export default Timeline