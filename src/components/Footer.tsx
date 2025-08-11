import React from 'react'
import { useState } from 'react';
import details from '@/data/detail';

type FooterProps = {
  handleResetAll : () => void;
};

export default function Footer({ handleResetAll }: FooterProps) {
  const [formData, setFormData] = useState(details);

  return (
    <div className='flex justify-end items-center space-x-[10px] fixed left-0 bottom-0 bg-white w-full p-[20px]'>
        <button 
          type='button'
          className='btn-tertiary' 
          onClick={handleResetAll}
        >
            Reset
        </button>

        <button 
          className='btn-secondary'
          type='button'
        >
            Preview
        </button>

        <button 
          className='btn-primary'
          type='button'
        >
            Download
        </button>
    </div>
  )
}
