import React from 'react'
import pngegg from './images/pngegg.png';

function Header() {
    return (
        <div className='bg-[url("https://www.cyberlinkasp.com/wp-content/uploads/2023/06/Intrusion-Detection-System.jpg")] bg-cover h-[80vh]'>
            <div className='w-full h-full bg-neutral-900 bg-opacity-70 flex items-center justify-between'>
                <div className='p-5 w-[600px]'>
                    <img src={pngegg} alt="" />
                </div>

                <div className='p-10 font-bold text-white w-[calc(100%-700px)]'>
                    <div className='tracking-[10px] text-[20px]'>Cloud Based</div>
                    <div className='text-[100px]'>Intrusion</div>
                    <div className='pl-36 text-red-500 text-[100px]'>Detection</div>
                    <div className='pl-96 text-[100px]'>System</div>
                </div>
            </div>
        </div>
    )
}

export default Header