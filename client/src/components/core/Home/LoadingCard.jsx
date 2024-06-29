import React from 'react'

const LoadingCard = () => {
  return (
    <div className='flex flex-col gap-y-3'>
        <div className='w-full py-10 aspect-video bg-night-50 animate-pulse rounded-lg'>        </div>
        <div className='w-full flex gap-x-3 items-start'>
          <div className='min-w-[35px] bg-night-50 animate-pulse aspect-square rounded-full'></div>
          <div className='w-full flex flex-col gap-1'>
            <div className='w-full py-2 bg-night-50 animate-pulse'></div>
            <div className='w-[40%] py-2 bg-night-50 animate-pulse'></div>
            <div className='w-[40%] py-2 bg-night-50 animate-pulse'></div>
            <div className='w-[60%] py-2 bg-night-50 animate-pulse'></div>
          </div>
        </div>
    </div>
  )
}

export default LoadingCard