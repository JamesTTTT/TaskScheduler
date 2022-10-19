import './App.css';
import taskManage from './manage/taskmanager';
import capacityManage from './manage/capacitymanager';
import occupiedHrs from './manage/occupiedhours';
import { useState, useEffect, useRef } from 'react';

import { AddTask, Header, Footer, TaskList, Settings, SelectView} from './components';

function App() {

  const [loadedTasks, setLoadedTasks] = useState([]);
  const [archived, setArchived] = useState([]);
  const [capacity, setCapacity] = useState(8);
  const [workHours, setWorkHours] = useState(["7","16"]);
  const [ocpHours, setOcpHours] = useState([{}]);
  const [isOptimized, setIsOptimized] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = 'My Task Scheduler';
  });

  useEffect(() => {
    //Get data
    let tasks = taskManage.getTasks()
    let cap = capacityManage.getWorkHours()
    let archived = taskManage.getArchived()

    // Check data
    if (cap === [null,null]){
      capacityManage.saveWorkHours(["7","16"])
    }

    if (tasks === null){
      taskManage.saveTasks([])
    }

    if(archived === null){
      taskManage.saveArchived([])
    }

    // Set data
    updateCapacity(cap[0],cap[1]);
    setWorkHours(cap);
    setLoadedTasks(tasks);
    setArchived(archived);

    }, [])


  useEffect(() => {
    let status = "default"

    if(isOptimized){
      status = "deadline"
    }

    let sortedTasks = taskManage.sortTasks(status,loadedTasks);
    let i = occupiedHrs.calcOcpHours(sortedTasks, workHours, capacity)
    console.log(i)
    setOcpHours(i)
    

  }, [loadedTasks, capacity, isOptimized])
  
  const displayForm = () =>{
    if (showForm) {
      setShowForm(false)
    } else {
      setShowForm(true)
    }
  }

  const updateTask = (newTasks) => {
    setLoadedTasks(newTasks)
    taskManage.saveTasks(newTasks)
  }

  const updateArchived = (arch) => {
    setArchived(arch);
    taskManage.saveArchived(arch)
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
      {/* <div>
            <SelectView
                //updateView={updateView}
                //displayForm={displayForm}
              //  handleSort={handleSort}
            />
        </div> */}
      <div className='mb-auto flex flex-col justify-center md:flex-row w-full'>
        <div>
          <div>
            <AddTask
              loadedTasks={loadedTasks} 
              updateTask={updateTask} 
              capacity={capacity}
              //ocpHours={ocpHours}
              workHours={workHours}
              showForm={showForm}
              setShowForm={setShowForm}
              displayForm={displayForm}
            />
          </div>
        </div>
        <div className='mb-1 w-11/12'>
          <TaskList 
            loadedTasks={loadedTasks}
            updateTask={updateTask}
            updateArchived={updateArchived}
            archived={archived}
            workHours={workHours} 
            capacity={capacity}
            ocpHours={ocpHours}
            isOptimized = {isOptimized}
            setIsOptimized = {setIsOptimized}
            displayForm={displayForm}
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
        <Footer loadedTasks={loadedTasks}/>

      </div>
    </div>
  );
}

export default App;
