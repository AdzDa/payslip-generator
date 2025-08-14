import React from 'react';

type FooterProps = {
  handleResetAll: () => void;
  handlePreview: () => void;
};

export default function Footer({ handleResetAll, handlePreview }: FooterProps) {
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
        onClick={handlePreview}
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
  );
}