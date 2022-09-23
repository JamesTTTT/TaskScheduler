import './App.css';
import taskManage from './manage/taskmanager';
import { useState, useEffect } from 'react';

import { AddTask, Header, Footer, TaskList, Settings, Timeline } from './components';

function App() {

  const [loadedTasks, setLoadedTasks] = useState([])
  const [capacity, setCapacity] = useState(0)

  useEffect(() => {
    document.title = 'My Task Scheduler';
  });

  useEffect(() => {
      setLoadedTasks(taskManage.getTasks())
      setCapacity(taskManage.getCapacity())
    }, [])

  const updateTask = (newTasks) => {
    setLoadedTasks(newTasks)
    taskManage.saveTasks(newTasks)
  }

  const updateCapacity = (newCap) => {
    setCapacity(newCap)
    taskManage.saveCapacity(newCap)
  }

  return (
    <div className='flex flex-col h-screen justify-between'>
      <div>
        <Header/>

      </div>
      <div className='mb-auto flex flex-col justify-between md:flex-row'>
          <AddTask loadedTasks={loadedTasks} updateTask={updateTask}/>
          <TaskList loadedTasks={loadedTasks} updateTask={updateTask}/>
          <Settings capacity={capacity} updateCapacity={updateCapacity}/>
      </div>
      <div>
        <Timeline loadedTasks={loadedTasks}/>
      </div>
      <div>
        <Footer/>

      </div>
    </div>
  );
}

export default App;
