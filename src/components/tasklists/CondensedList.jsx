import React from 'react'
import {AiOutlineDelete, AiOutlineEdit, AiOutlineCheck} from 'react-icons/ai'
import {BiArchiveIn} from 'react-icons/bi'
import colorManage from '../../manage/colormanager'
import timeline from '../../manage/timeline'

const CondensedList = ({loadedTasks, handleDelete, handleDone, handleEdit, searchPhrase,handleArch}) => {
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
                    <tr 
                    key={index}
                    className="border-b border-gray-700"
                    >   
                        
                        <td className='py-3'>
                            <p className='text-md font-semibold'>{item.title} </p>
                        </td>

                        <td className='text-md font-semibold'>{item.deadline}</td>
                        <td className='text-md font-semibold'>{item.startdate}</td>
                        <td className='text-md font-semibold'>{daysLeft(item.deadline)}</td>
                        <td className='text-md font-semibold'>{item.duration} hours</td>
                        <td 
                            className='text-md font-semibold'>
                            {item.category}
                        </td>
                        <td >
                            <p
                            style={{color: colorManage.statusColorTable(item.status)}}
                            className='text-md text-white font-bold'>
                                {item.status}
                            </p>
                        </td>

                        <td>
                            <div>
                                <button
                                    onClick={() => { 
                                        handleDelete(item.id)
                                    }}
                                    className='text-3xl p-2 text-slate-700 rounded-3x
                                    hover:text-red-500 transition-colors mx-1'>
                                        <AiOutlineDelete/>
                                </button>
                                <button
                                    onClick={()=>handleEdit(item.id)}
                                    className='text-3xl p-2 text-slate-700 rounded-3x
                                    hover:text-blue-500 transition-colors mx-1'>
                                        <AiOutlineEdit/>
                                </button>                             
                                {archiveBtn(item.status)
                                ?   <button
                                      onClick={()=>handleDone(item.id)}
                                      className='text-3xl p-2 text-slate-700 rounded-3x font-bold
                                      hover:text-green-500 transition-colors mx-1'>
                                          <AiOutlineCheck/>
                                    </button>
                                :   <button
                                    onClick={()=>handleArch(item, item.id)}
                                    className='text-2xl p-2 text-slate-500 rounded-3xl font-bold
                                    hover:text-slate-700 transition-colors mx-1'>
                                        <BiArchiveIn/>
                                    </button>
                                }
                            </div>
                        </td>
                    </tr>
                )
            })
        }
    }
  return (
    <>    
    <div>
        <h1 className='text-center text-3xl p-2'>Active Task List</h1>
    </div>
    <table className="w-full text-sm text-center text-gray-800 ">
    <thead className="text-xs uppercase bg-slate-700 text-gray-200 p-1">
      <tr>
        <th>Title</th>
        <th>Due</th>
        <th>Started</th>
        <th>Deadline in</th>
        <th>Duration</th>
        <th>Category</th>
        <th>Status</th>
        <th>Controls</th>
      </tr>
    </thead>
    <tbody>
        {tasks()}
    </tbody>
    </table>
    </>
  )
}

export default CondensedList