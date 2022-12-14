import React from 'react'
import { CSVLink } from 'react-csv';
import { useState,useEffect } from 'react';
import autoTable from 'jspdf-autotable';
import download from '../manage/download'
import {AiFillGithub} from 'react-icons/ai'

const Footer = ({loadedTasks}) => {

  const [isTasksAvailable, setIsTasksAvailable] = useState(false);
  
  useEffect(() => {
    if(loadedTasks){
      if(loadedTasks.length > 0){
          setIsTasksAvailable(true)
      }
    }

  }, [loadedTasks])
  

  return (
    <div>
      <div className='bg-blue-500 w-full flex justify-center items-center text-white flex-col pb-4'>
        <p className='text-xl p-2'>Export all tasks</p>
        {isTasksAvailable
        ?(
          <div className=' p-3 flex flex-row justify-between'>
          <CSVLink
              style={{ textDecoration: 'none' }}
              data={loadedTasks}
              filename={'task_data.csv'}
              target="_blank"
          >
              <button
              className='mr-5 p-2 bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors'>
                Export CSV
              </button>
            </CSVLink>


          <button 
            onClick={()=>download.exportPdf(loadedTasks)}
            className='ml-5 p-2 bg-blue-700 rounded-xl
            hover:bg-blue-800 transition-colors'
            >
              Export PDF
            </button>
        </div>
        )
        :<div> 
          <h1>
            No tasks to export 
          </h1>
        </div>}
        <div className='text-3xl text-white text-center p-3'>
          <a href='https://github.com/JamesTTTT/TaskScheduler'>
            <AiFillGithub/>
        </a>
      </div>
      </div>
    </div>
  )
}

export default Footer