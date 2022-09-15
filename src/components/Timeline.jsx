import React from 'react'
import moment from 'moment'
import { useState } from 'react'


const Timeline = (loadedTasks) => {

    const [dateObj, setDateObj] = useState({
      dateObject: moment()
    })

  //   const daysOfTheYear = (month) => {

  //     let monthDayCount = monthDays(2022)
  //      return monthDayCount.map((day)=> {
  //          return (
  //            <div key={day}>
  //            <div className=' bg-blue-500 text-sm px-1 border-solid border-blue-800 border-x-2'>
  //              <p>
  //                {day}
  //              </p>
  //            </div>
  //          </div>
  //          );
  //       });
  //  }

    const daysOfTheYear = (y,m) =>{
      //let months = moment.months();

      let daysInMonths = [];
      let yearMonth = "";
      for (let mon = 1; mon<=12; mon++) {
        yearMonth = y.toString()+"-0"+mon.toString()
        const numDaysInMonth = moment(yearMonth, "YYYY-MM").daysInMonth();
        daysInMonths.push(numDaysInMonth)
      }
      //for (let d = months.indexOf(m)+1)
      //return daysInMonths

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
              <p>
                {month}
                <div className='flex'>

                  {daysOfTheYear(2022,month)}
                </div>
              </p>
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