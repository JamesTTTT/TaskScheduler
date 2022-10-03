import './App.css';
import taskManage from './manage/taskmanager';
import capacityManage from './manage/capacitymanager';
import { useState, useEffect } from 'react';

import { AddTask, Header, Footer, TaskList, Settings, Timeline } from './components';

function App() {

  const [loadedTasks, setLoadedTasks] = useState([])
  const [capacity, setCapacity] = useState(8)
  const [occupiedHours, setOccupiedHours] = useState([])

  useEffect(() => {
    document.title = 'My Task Scheduler';
  });

  useEffect(() => {
    //Get data
    let tasks = taskManage.getTasks()
    let cap = capacityManage.getCapacity()

    // Check data
    if (cap === null){
      capacityManage.saveCapacity(8)
    }
    if (tasks === null){
      taskManage.saveTasks([])
    }

    // Set data
    setCapacity(cap)
    setLoadedTasks(tasks)
    }, [])

  const updateTask = (newTasks) => {
    setLoadedTasks(newTasks)
    taskManage.saveTasks(newTasks)
  }

  const updateCapacity = (newCap) => {
    setCapacity(newCap)
    capacityManage.saveCapacity(newCap)
  }

  return (
    <div className='flex flex-col h-screen justify-between'>
      <div>
        <Header/>

      </div>
      <div className='mb-auto flex flex-col justify-between md:flex-row'>
          <AddTask loadedTasks={loadedTasks} updateTask={updateTask} capacity={capacity}/>
          <TaskList loadedTasks={loadedTasks} updateTask={updateTask}/>
          <Settings capacity={capacity} updateCapacity={updateCapacity}/>
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
