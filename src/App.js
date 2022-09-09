import './App.css';
import taskManage from './manage/taskmanager'
import { useState, useEffect } from 'react';

import { AddTask, Header, Footer, TaskList } from './components';

function App() {

  const [loadedTasks, setLoadedTasks] = useState([])

  useEffect(() => {
      setLoadedTasks(taskManage.getTasks())
    }, [])

  const updateTask = (newTasks) => {
    setLoadedTasks(newTasks)
  }

  return (
    <div className='flex flex-col h-screen justify-between'>
      <div>
        <Header/>

      </div>
      <div className='mb-auto'>
        <AddTask loadedTasks={loadedTasks} updateTask={updateTask}/>
        <TaskList loadedTasks={loadedTasks} updateTask={updateTask}/>
      </div>
      <div>
        <Footer/>

      </div>
    </div>
  );
}

export default App;
