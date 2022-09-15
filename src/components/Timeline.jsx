import React from 'react'
import moment from 'moment'
import { useState } from 'react'


const Timeline = (loadedTasks) => {

    const [dateObj, setDateObj] = useState({
      dateObject: moment()
    })

    // const timelineHeader = () => {

    // }

    // const taskRows = () => {

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
        let weekdayshortname = weekdayshort.map(day => {
            return (
              <div key={day}>
              <div className=' bg-blue-500 text-xs'>
                <p>
                  {day}
                </p>
              </div>
            </div>
            );
         });
        return weekdayshortname
    }

    const month = () => {
      let months = moment.months();
      let monthNames = months.map(day => {
        return (
          <div key={day}>
            <div className='p-1 bg-blue-500'>
              <p>
                {day}
                <div className='flex'>
                  {week()}
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
      <div className='flex text-white justify-center w-screen'>
        {month()}
      </div>  
      
      {firstDayOfMonth()}
      </div>
    )
}

export default Timeline