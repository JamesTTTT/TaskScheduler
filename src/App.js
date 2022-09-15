import './App.css';
import taskManage from './manage/taskmanager'
import { useState, useEffect } from 'react';

import { AddTask, Header, Footer, TaskList, Settings, Timeline } from './components';

function App() {

  const [loadedTasks, setLoadedTasks] = useState([])

  useEffect(() => {
      setLoadedTasks(taskManage.getTasks())
    }, [])

  const updateTask = (newTasks) => {
    setLoadedTasks(newTasks)
    taskManage.saveTasks(newTasks)
  }

  return (
    <div className='flex flex-col h-screen justify-between'>
      <div>
        <Header/>

      </div>
      <div className='mb-auto flex flex-col justify-between md:flex-row'>
          <AddTask loadedTasks={loadedTasks} updateTask={updateTask}/>
          <TaskList loadedTasks={loadedTasks} updateTask={updateTask}/>
          <Settings/>
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
