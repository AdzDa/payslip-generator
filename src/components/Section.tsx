import React from 'react'

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({title, children}: SectionProps) {
  return (
    <div className='rounded-[4.5px] bg-white flex flex-col'>
        {/* Header - Title */}
        <div className='px-[24px] py-[16px] border-b-[1px] border-b-gray-200'>
            <p className='font-bold'>{title}</p>
        </div>

        {/* Input(s) */}
        <div className='px-[24px] py-[16px] flex flex-col space-y-[24px]'>
            {children}
        </div>
    </div>
  )
}
