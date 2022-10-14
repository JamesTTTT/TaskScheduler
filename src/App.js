import './App.css';
import taskManage from './manage/taskmanager';
import capacityManage from './manage/capacitymanager';
import occupiedHrs from './manage/occupiedhours';
import { useState, useEffect, useRef } from 'react';

import { AddTask, Header, Footer, TaskList, Settings, Timeline} from './components';

function App() {

  const [loadedTasks, setLoadedTasks] = useState([]);
  const [capacity, setCapacity] = useState(8);
  const [workHours, setWorkHours] = useState(["7","16"]);
  const [ocpHours, setOcpHours] = useState([{}]);
  const [isOptimized, setIsOptimized] = useState(true);


  useEffect(() => {
    document.title = 'My Task Scheduler';
  });

  useEffect(() => {
    //Get data
    let tasks = taskManage.getTasks()
    let cap = capacityManage.getWorkHours()

    // Check data
    if (cap === [null,null]){
      capacityManage.saveWorkHours(["7","16"])
    }

    if (tasks === null){
      taskManage.saveTasks([])
    }

    // Set data
    updateCapacity(cap[0],cap[1])
    setWorkHours(cap)
    setLoadedTasks(tasks)
    }, [])


  useEffect(() => {
    let status = "default"

    if(isOptimized){
      status = "deadline"
    }

    let sortedTasks = taskManage.sortTasks(status,loadedTasks);
    let i = occupiedHrs.calcOcpHours(sortedTasks, workHours, capacity)
    setOcpHours(i)

  }, [loadedTasks, capacity, isOptimized])
  

  const updateTask = (newTasks) => {
    setLoadedTasks(newTasks)
    taskManage.saveTasks(newTasks)
  }

  const updateCapacity = (start, end) => {
    let cap = capacityManage.calcCapacity(start,end)
    setWorkHours([start,end])
    setCapacity(cap)
    capacityManage.saveWorkHours([start,end])
  }

  return (
    <div className='flex flex-col h-screen justify-between'>
      <div>
        <Header/>

      </div>
      <div className='mb-auto flex flex-col justify-center md:flex-row w-full'>
        <div style={{height:"700px"}}>
          <div className='absolute left-0'>
            <AddTask 
              loadedTasks={loadedTasks} 
              updateTask={updateTask} 
              capacity={capacity}
            />
          </div>
        </div>
        <div className='w-3/5 mb-20'>
          <TaskList 
            loadedTasks={loadedTasks}
            updateTask={updateTask}
          />
        </div>
        <div className='absolute right-0'>
          <Settings 
            workHours={workHours} 
            capacity={capacity} 
            updateCapacity={updateCapacity}
          />
        </div>
          
      </div>

      <div>
  {/* <div>
    <label for="checked-toggle" className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        id="checked-toggle" 
        className="sr-only peer"
        checked={isOptimized}
        onChange={(e)=>{
          setIsOptimized(e.target.checked)
          console.log()
        }}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4
       dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
        after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
        after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
      </div>
      
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Optimize</span>
    </label>
  </div> */}
        <Timeline 
          workHours={workHours} 
          loadedTasks={loadedTasks} 
          capacity={capacity}
          ocpHours={ocpHours}
          isOptimized = {isOptimized}
          setIsOptimized = {setIsOptimized}
        />
      </div>
      <div>
        <Footer loadedTasks={loadedTasks}/>

      </div>
    </div>
  );
}

export default App;
