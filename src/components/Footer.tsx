import React from 'react'

export default function Footer() {
  return (
    <div className='flex justify-end items-center space-x-[10px] fixed left-0 bottom-0 bg-white w-full p-[20px]'>
        <button className='btn-tertiary'>
            Reset
        </button>

        <button className='btn-secondary'>
            Preview
        </button>

        <button className='btn-primary'>
            Download
        </button>
    </div>
  )
}
