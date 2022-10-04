import './App.css';
import taskManage from './manage/taskmanager';
import capacityManage from './manage/capacitymanager';
import { useState, useEffect } from 'react';

import { AddTask, Header, Footer, TaskList, Settings, Timeline } from './components';

function App() {

  const [loadedTasks, setLoadedTasks] = useState([])
  const [capacity, setCapacity] = useState(8)
  const [workHours, setWorkHours] = useState([7,16])

  useEffect(() => {
    document.title = 'My Task Scheduler';
  });

  useEffect(() => {
    //Get data
    let tasks = taskManage.getTasks()
    let cap = capacityManage.getWorkHours()

    // Check data
    if (cap === null){
      capacityManage.saveWorkHours([7,16])
    }
    if (tasks === null){
      taskManage.saveTasks([])
    }

    // Set data
    let hours = capacityManage.calcCapacity(cap[0],cap[1])
    
    setWorkHours(cap)
    setCapacity(hours)
    setLoadedTasks(tasks)
    }, [])

  const updateTask = (newTasks) => {
    setLoadedTasks(newTasks)
    taskManage.saveTasks(newTasks)
  }

  const updateCapacity = (start, end) => {
    let cap = capacityManage.calcCapacity(start,end)
    setWorkHours([start,end])
    setCapacity(cap)
    capacityManage.saveWorkHours(workHours)
  }

  return (
    <div className='flex flex-col h-screen justify-between'>
      <div>
        <Header/>

      </div>
      <div className='mb-auto flex flex-col justify-center md:flex-row w-full'>
        <div style={{height:"700px"}}>
          <div className='absolute left-0'>
            <AddTask loadedTasks={loadedTasks} updateTask={updateTask} capacity={capacity}/>
          </div>
        </div>
        <div className='w-3/5 mb-20'>
          <TaskList loadedTasks={loadedTasks} updateTask={updateTask}/>
        </div>
        <div className='absolute right-0'>
          <Settings workHours={workHours} capacity={capacity} updateCapacity={updateCapacity}/>
        </div>
          
      </div>
      <div>
        <Timeline loadedTasks={loadedTasks} capacity={capacity}/>
      </div>
      <div>
        <Footer loadedTasks={loadedTasks}/>

      </div>
    </div>
  );
}

export default App;
