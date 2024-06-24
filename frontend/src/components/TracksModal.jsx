import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiBookOpenTextLight } from 'react-icons/pi'


const TracksModal = ({ album, onClose, tracks }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}>
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-black rounded-xl p-4 flex flex-col relative'>
        <AiOutlineClose
          className='absolute right-6 top-6 text-2xl text-red-600 cursor-pointer'
          onClick={onClose} 
        />
        <h2 className='w-full px-4 py-1 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-2xl text-white'>Tracks</h2>
        <div className='flex items-center justify-center text-white'>
          <PiBookOpenTextLight className='text-red-400 text-6xl' />
          <h2 className='m-4 text-2xl'>{album.name}</h2>
        </div>
        {tracks.map(track => (
          <div className='flex justify-start items-center gap-x-2'>
            <li key={track.id} style={{ color: '#D6C4C4' }}>
              {track.name}
            </li>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TracksModal