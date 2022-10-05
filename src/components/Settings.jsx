import React from 'react'
import {FiSettings} from 'react-icons/fi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState, useEffect } from 'react'


const Settings = ({workHours, capacity,updateCapacity}) => {
    const [showSettings, setSettings] = useState(false)
    const [endTime, setEndTime] = useState(0);
    const [startTime, setStartTime] = useState(0);

    useEffect(() => {
        setStartTime(workHours[0])
        setEndTime(workHours[1])
    }, [])
    

    useEffect(() => {
        updateCapacity(startTime,endTime)
    }, [startTime,endTime])

    
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

            <div className='flex flex-col p-3 bg-slate-100 shadow-xl rounded-xl h-fit'>
                <div className='flex flex-row'>
                <div className='pr-2'>
                <label>Start Time: </label>
                    <select 
                        value={workHours[0]}
                        onChange={(e)=>{
                            setStartTime(e.target.value)
                        }}
                        className='bg-gray-50 border border-gray-300 text-gray-900
                        text-sm rounded-lg block p-2.5 w-fit' 
                        >
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
                <div className='pl-2'>
                <label>Finish Time: </label>
                    <select
                        value={workHours[1]}
                        onChange={(e)=>{
                            setEndTime(e.target.value)
                        }}
                        className='bg-gray-50 border border-gray-300 text-gray-900
                                    text-sm rounded-lg block p-2.5 w-fit' 
                        >
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
                </div>            
                    <div className='py-2'>
                        <p>Your current work capacity is</p>
                        <p> <span className='font-bold'>
                            {capacity} </span> 
                            hours a day</p>
                    </div>
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