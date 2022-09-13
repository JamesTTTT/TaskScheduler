import React from 'react'
import {FiSettings} from 'react-icons/fi'
import { useState } from 'react'

const Settings = () => {
    const [time, setTime] = useState(0)

    return (
        <>
        <div>
            <div>
                <input type="text" />
            </div>
        </div>
        <div className='p-4'>
            <button className='p-2 bg-blue-500 rounded-full text-xl transition hover:bg-blue-600'>
                <FiSettings className='text-white'/>
            </button>
        </div>
        </>
    )
}

export default Settings