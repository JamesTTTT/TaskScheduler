import React from 'react'
//import downLoadManager from '../manage/downloadmanager'
import { CSVLink } from 'react-csv';

const Footer = ({loadedTasks}) => {
  
  return (
    <div>
      <div className='bg-blue-500 w-full flex justify-center items-center text-white flex-col'>
        <p className='text-xl p-2'>Export all tasks</p>
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


          {/* <button className='ml-5 p-2 bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors'>Export PDF</button> */}
        </div>
      </div>
    </div>
  )
}

export default Footer