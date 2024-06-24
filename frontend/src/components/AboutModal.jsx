import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiBookOpenTextLight } from 'react-icons/pi'


const AboutModal = ({ album, onClose }) => {
    return (
        <div
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}>
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[600px] max-w-full h-[400px] bg-black rounded-xl p-4 flex flex-col relative'>
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h2 className='w-full px-4 py-1 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-2xl text-white'>About this {album.type}</h2>
                <div className='flex items-center justify-center text-white'>
                    <PiBookOpenTextLight className='text-red-400 text-6xl' />
                    <h2 className='m-4 text-2xl'>{album.name}</h2>
                </div>
                <div className='text-white'>
                    Copyrights
                    {album.copyrights.map(copyright => (
                        <div className='flex justify-start items-center gap-x-2'>
                            <li style={{ color: '#D6C4C4' }}>
                                {copyright.text}
                            </li>
                        </div>
                    ))}
                </div>
                <div className="form-group-button grid place-items-center absolute inset-x-2 bottom-8"><br />
                    <a className='flex w-1/4 border-green-600 border-2 rounded-full p-2 hover:bg-green-600 text-md text-white' href={album.external_urls.spotify} target='_blank'>
                        <img src='/spotify.png' className='w-6' /> &nbsp; Listen to Spotify
                    </a>
                </div>
                <div className='text-white'>
                    Label:
                    <li style={{ color: '#D6C4C4' }}>
                        {album.label}
                    </li>
                </div>
                <div className='text-white'>
                    Popularity
                    <li style={{ color: '#D6C4C4' }}>
                        {album.popularity}
                    </li>
                </div>
            </div>
        </div>
    )
}

export default AboutModal