import React from 'react'
import { useEffect, useState } from 'react'
import taskManage from '../manage/taskmanager'

const TaskList = () => {

    const [loadedTasks, setLoadedTasks] = useState({})

    useEffect(() => {
        setLoadedTasks(taskManage.getTasks())
      }, [])
    
    console.log(loadedTasks)
    
  return (
    <div>
        <div>
            <h1 className='text-3xl font-thin text-center'>All Tasks</h1>
        </div>
    </div>
  )
}

export default TaskList