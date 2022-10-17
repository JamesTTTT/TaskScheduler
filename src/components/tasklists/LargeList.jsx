import React from 'react'
import {AiOutlineDelete, AiOutlineEdit, AiOutlineCheck} from 'react-icons/ai'
import {BiArchiveIn} from 'react-icons/bi'
import colorManage from '../../manage/colormanager'
import timeline from '../../manage/timeline'


const LargeList = ({loadedTasks, handleDelete, handleDone, handleEdit, searchPhrase, handleArch}) => {

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
                    className=" transition-colors rounded-xl pb-4 bg-white mx-4 w-72
                    hover:bg-slate-200 flex flex-col justify-between my-3 shadow-xl"
                    >   
                        <div 
                            className=' rounded-t-xl p-2 text-white flex flew-row justify-between'
                            style={{backgroundColor: colorManage.statusColor(item.status)}}
                        >
                            <p className='text-xl font-light'>{item.title} </p>
                            <p className='text-sm font-light'>{item.status}</p>
                        </div>
                        <div className='px-4 pt-1'>
                            <p className='text-lg font-semibold'>Due: {item.deadline}</p>
                            <p className='text-sm font-semibold'>Started: {item.startdate}</p>
                            <p className='text-sm font-semibold'>{daysLeft(item.deadline)}</p>
                            <p className='text-sm font-semibold'>{item.duration} hours
                                <span 
                                    className='px-2 rounded-xl mx-1'
                                    style={{backgroundColor: colorManage.difficultyColor(item.category)}}>
                                    {item.category}
                                </span>
                            </p>
                            <div 
                                className='h-20 break-words max-h-20 text-sm overflow-hidden mt-2 px-1'
                            >
                                <p>{item.description}</p>
                            </div>
                            
                            
    
                        </div>
                        {/* container for buttons */}
                        <div className='pt-3 flex flex-row-reverse justify-between items-start'>
                            <div className='px-2'>
                                {archiveBtn(item.status)
                                ?   <button
                                      onClick={()=>handleDone(item.id)}
                                      className='text-2xl p-2 bg-green-500 rounded-3xl text-white
                                      hover:bg-slate-700 transition-colors mx-1'>
                                          <AiOutlineCheck/>
                                    </button>
                                :   <button
                                    onClick={()=>handleArch(item,item.id)}
                                    className='text-2xl p-2 bg-slate-500 rounded-3xl text-white
                                    hover:bg-slate-700 transition-colors mx-1'>
                                        <BiArchiveIn/>
                                    </button>
                                }
    
                            </div>
                            <div className='flex justify-end px-2'>
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
                )
            })
        }
        else {
            return(
              <div>
                <p>
                  EMPTY
                </p>
              </div>
            )
          }
        }
  return (
        <div className='flex flex-row justify-center flex-wrap'>
            {tasks()}
        </div> 
  )
}

export default LargeList