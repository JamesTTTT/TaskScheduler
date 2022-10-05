import React from 'react'
import {BsCalendar3Range} from 'react-icons/bs'

const JumpToTimelineBtn = () => {
    const timelineComp = document.getElementById("timelineID");

    const handleScroll = () =>{
        timelineComp.scrollIntoView({behavior: "smooth", block: "end"});
    }

    return (
      <div className='flex justify-center'>
          <button 
          onClick={()=>{handleScroll()}}
          className='
              p-2 bg-blue-500 rounded-full text-xl
              transition hover:bg-blue-600 text-white'
          >
              <BsCalendar3Range/>
          </button>
      </div>
  )
}

export default JumpToTimelineBtn