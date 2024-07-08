import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiBookOpenTextLight } from 'react-icons/pi'


const AboutModal = ({ album, onClose }) => {
    return (
        <div
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center'
            onClick={onClose}>
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[600px] max-w-full h-[auto] bg-gray-600 rounded-xl p-4 flex flex-col relative'>
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h2 className='w-full px-4 py-1 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-2xl text-white'>
                    <h2 className='m-2 text-2xl tracking-wide'>About {album.name}</h2>
                </h2><br />
                <div className='text-white'>
                    <div className='text-xl'>Copyrights</div>
                    {album.copyrights.map(copyright => (
                        <div className='flex justify-start items-center gap-x-2'>
                            <li>
                                {copyright.text}
                            </li>
                        </div>
                    ))}<br />
                    <div className='text-xl'>Label:</div>
                    <li>
                        {album.label}
                    </li><br />
                    <div className='text-xl'>Popularity</div>
                    <li>
                        {album.popularity}
                    </li>
                </div>
                <div className="form-group-button grid place-items-center"><br />
                    <a className='flex w-1/4 border-green-600 border-2 rounded-full p-2 hover:bg-green-600 text-md text-white' href={album.external_urls.spotify} target='_blank'>
                        <img src='/spotify.png' className='w-6' /> &nbsp; Listen to Spotify
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AboutModal