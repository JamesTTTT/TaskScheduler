import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

const Search = ({searchPhrase, setSearchPhrase}) => {
  return (
    <div className='flex row content-center justify-center p-4'>
        <div className='flex rounded-xl bg-blue-500 w-80'>
            <div className='flex items-center pointer-events-none'>
                <AiOutlineSearch className='w-5 h-5 mx-2 text-white'/>
            </div>
            <input
            type="search"
            placeholder='Search Tasks'
            value={searchPhrase}
            onChange={(e)=>{setSearchPhrase(e.target.value)}}
            className='
            w-full text-gray-700 text-sm rounded-r-xl bg-slate-300
            p-3 placeholder-gray-700 focus:outline-none focus:border-blue-500'
            />
        </div>
    </div>
  )
}

export default Search