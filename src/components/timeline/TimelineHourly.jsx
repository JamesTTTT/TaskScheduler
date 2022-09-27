import React from 'react'

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

const TimelineHourly = ({loadedTasks}) => {
  return (
    <div className='flex flex-row-reverse'>
    <div className='max-w-screen-xs overflow-x-scroll'>

        {/* <TimelineHeader loadedTasks={loadedTasks}/>
        <TimelineBody loadedTasks={loadedTasks}/> */}

    </div>
    <div>
      <div className='bg-slate-700 font-bold outline text-white w-48 text-center outline-blue-800 outline-1 pb-4'>
        <h2>Task List</h2>
      </div>
        <TaskList loadedTasks={loadedTasks} />
    </div>
  </div>
  )
}

export default TimelineHourly