import React from 'react'
import { CSVLink } from 'react-csv';

import autoTable from 'jspdf-autotable';
import download from '../manage/download'

const Footer = ({loadedTasks}) => {

  return (
    <div>
      <div className='bg-blue-500 w-full flex justify-center items-center text-white flex-col'>
        <p className='text-xl p-2'>Export all tasks</p>
        {loadedTasks
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

      </div>
    </div>
  )
}

export default Footer