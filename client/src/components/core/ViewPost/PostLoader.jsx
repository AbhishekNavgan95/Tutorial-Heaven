import React from 'react'

const PostLoader = () => {
  return (
    <div className='w-full flex gap-x-3'>
        <div className='aspect-video w-[40%] bg-night-50 animate-pulse rounded-lg'></div>
        <div className='w-[60%] flex flex-col gap-1'>
            <div className='py-3 w-full bg-night-50 animate-pulse'></div>
            <div className='py-2 w-[60%] bg-night-50 animate-pulse'></div>
            <div className='w-full flex gap-1'>
                <div className='w-[30%] bg-night-50 py-2 animate-pulse'></div>
                <div className='w-[30%] bg-night-50 py-2 animate-pulse'></div>
            </div>
        </div>
    </div>
  )
}

export default PostLoader