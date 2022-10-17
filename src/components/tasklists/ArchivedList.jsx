import React from 'react'
import colorManage from '../../manage/colormanager'
import { AiOutlineDelete } from 'react-icons/ai'
const ArchivedList = ({archived}) => {

  const archivedList = () =>{
    //console.log(archived)
    if(archived){
      return archived.map((item, index) => {
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
              <td className='text-md font-semibold'>{item.duration} hours</td>
              <td 
                  className='text-md font-semibold'>
                  {item.category}
              </td>

              <td>
                  <div>
                      <button
                          onClick={() => { 
                              //handleDelete(item.id)
                          }}
                          className='text-3xl p-2 text-slate-700 rounded-3x
                          hover:text-red-500 transition-colors mx-1'>
                              <AiOutlineDelete/>
                      </button>                            
                  </div>
              </td>
          </tr>
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
    <>
    <div>
      <h1 className='text-center text-3xl p-2'>Archived Tasks</h1>
    </div>
    <table className="w-full text-sm text-center text-gray-800 ">
    <thead className="text-xs uppercase bg-green-700 text-gray-200 p-1">
      <tr>
        <th>Title</th>
        <th>Due</th>
        <th>Started</th>
        <th>Duration</th>
        <th>Category</th>
        <th>Controls</th>
      </tr>
    </thead>
    <tbody>
        {archivedList()}
    </tbody>
    </table>
    </>
  )
}

export default ArchivedList