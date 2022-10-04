import React from 'react'
import {AiOutlineDelete, AiOutlineEdit, AiOutlineCheck} from 'react-icons/ai'
import {BiArchiveIn} from 'react-icons/bi'
import colorManage from '../../manage/colormanager'
import timeline from '../../manage/timeline'

const CondensedList = ({loadedTasks, handleDelete, handleDone, handleEdit, searchPhrase}) => {
    const archiveBtn = (status) =>{
        let comp = true;
        if (status === "Complete"){
            comp = false;
        }
        return comp
    }
    
    const daysLeft = (deadline) =>{
        let today = new Date()
        let daysLeft = timeline.taskLenght(today,deadline)
        let stateString = "Deadline in " + daysLeft.toString() + " days";
        if(daysLeft < 0) {
            daysLeft = daysLeft * -1
            stateString = "Deadline was " + daysLeft.toString() + " days ago";
        }
        return stateString;
    }

    const tasks = () => {
        if (loadedTasks) {
            return loadedTasks
            .filter(item => {
                if (searchPhrase === ''){
                    return item
            } else if(item.title.toLowerCase().includes(searchPhrase.toLowerCase())) {
                    return item
            }
                return
            }).map((item, index) => {
                return(
                    <div 
                    key={index}
                    className=" transition-colors rounded-xl bg-white
                    hover:bg-slate-200 flex flex-col justify-between shadow-xl mb-4"
                    >   
                        
                        <div 
                            className=' rounded-t-xl px-2 text-white flex flew-col justify-between self-auto'
                            style={{backgroundColor: colorManage.statusColor(item.status)}}
                        >
                            <p className='text-md font-light'>{item.title} </p>
                            <p className='text-md font-light'>{item.status}</p>
                        </div>

                        <div>
                        <div className='px-4 flex justify-between'>

                                <p className='text-md font-semibold'>Due: {item.deadline}</p>
                                <p className='text-md font-semibold'>Started: {item.startdate}</p>
                                <p className='text-md font-semibold'>{daysLeft(item.deadline)}</p>
                                <p className='text-md font-semibold'>{item.duration} hours</p>
                                <p 
                                    className='px-2 text-md rounded-xl mx-1 h-fit font-bold'
                                    style={{backgroundColor: colorManage.difficultyColor(item.category)}}>
                                    {item.category}
                                </p>


                            {/* <div 
                                className='break-words text-sm overflow-hidden mt-2 px-1'
                            >
                                <p>{item.description}</p>
                            </div> */}
                            
                            
    
                        
                        {/* container for buttons */}
                        <div className='p-1'>
                            <div className='px-2 flex flex-row-reverse'>
                                {archiveBtn(item.status)
                                ?   <button
                                      onClick={()=>handleDone(item.id)}
                                      className='text-2xl p-2 bg-green-500 rounded-3xl text-white
                                      hover:bg-slate-700 transition-colors mx-1'>
                                          <AiOutlineCheck/>
                                    </button>
                                :   <button
                                    onClick={()=>handleDone(item.id)}
                                    className='text-2xl p-2 bg-slate-500 rounded-3xl text-white
                                    hover:bg-slate-700 transition-colors mx-1'>
                                        <BiArchiveIn/>
                                    </button>
                                }
    
                                <button
                                onClick={()=>handleEdit(item.id)}
                                className='text-2xl p-2 bg-slate-700 rounded-3xl text-white
                                hover:bg-blue-500 transition-colors mx-1'>
                                    <AiOutlineEdit/>
                                </button>
    
                                <button
                                onClick={()=>handleDelete(item.id)}
                                className='text-2xl p-2 bg-slate-700 rounded-3xl text-white
                                hover:bg-red-500 transition-colors mx-1'>
                                    <AiOutlineDelete/>
                                </button>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                )
            })
        }
    }
  return (
    <div className='flex flex-col justify-center'>
        {tasks()}
    </div>
  )
}

export default CondensedList