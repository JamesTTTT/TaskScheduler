import React from 'react'
import taskManage from '../manage/taskmanager'
import {FiSettings} from 'react-icons/fi'
import {AiOutlineClose} from 'react-icons/ai'

import { useState } from 'react'

const Settings = ({capacity,updateCapacity}) => {
    const [showSettings, setSettings] = useState(false)

    //const [time, setTime] = useState(0)

    const displaySettings = () =>{
        if (showSettings) {
            setSettings(false)
        } else {
            setSettings(true)
        }
      }

    return (
        <>
        {showSettings ? (
        <div className='flex flex-row-reverse'>
            <div className='p-4'>
                <button
                  onClick={displaySettings} 
                  className='text-xl rounded-full p-2 bg-red-500 text-white'
                  >
                  <AiOutlineClose/>
                </button>
            </div>
            <div className='p-3'>
                <label> Enter Daily Hours</label>
                <input 
                    type="number"
                    value={capacity}
                    placeholder={capacity}
                    onChange={(e)=>{updateCapacity(e.target.value)}}
                    className='bg-gray-50 border border-gray-300 text-gray-900
                                text-sm rounded-lg block p-2.5 w-20' />
            </div>
        </div>) : 
        <div className='p-4'>
            <button
                onClick={()=>{displaySettings()}}
                className='p-2 bg-blue-500 rounded-full text-xl transition hover:bg-blue-600'>
                <FiSettings className='text-white'/>
            </button>
        </div>
        }
        </>
    )
}

export default Settings