import React from 'react'
import{ X } from 'lucide-react'

export default function Header() {
  return (
    <div className="sticky top-0 bg-white p-[20px] w-full flex justify-end items-center">
        <X
        className='w-[14px] h-[14px] text-primary'/>
    </div>
  )
}
