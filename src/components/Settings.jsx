import React from 'react'
import {FiSettings} from 'react-icons/fi'
import {AiOutlineClose} from 'react-icons/ai'

import { useState } from 'react'

const Settings = ({capacity,updateCapacity}) => {
    const [showSettings, setSettings] = useState(false)

    const [startTime, setStartTime] = useState(0);
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
                    max="24"
                    min="1"
                    onChange={(e)=>{updateCapacity(e.target.value)}}
                    className='bg-gray-50 border border-gray-300 text-gray-900
                                text-sm rounded-lg block p-2.5 w-20' />
            </div>
            <div>
            <label>Start Time: </label>
                <select
                    onChange={(e)=>{
                        setStartTime(e.target.value)
                    }}>
                    <option value="1">1:00</option>
                    <option value="2">2:00</option>
                    <option value="3">3:00</option>
                    <option value="4">4:00</option>
                    <option value="5">5:00</option>
                    <option value="6">6:00</option>
                    <option value="7">7:00</option>
                    <option value="8">8:00</option>
                    <option value="9">9:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                    <option value="20">20:00</option>
                    <option value="21">21:00</option>
                    <option value="22">22:00</option>
                    <option value="23">23:00</option>
                    <option value="24">0:00</option>
                </select>
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