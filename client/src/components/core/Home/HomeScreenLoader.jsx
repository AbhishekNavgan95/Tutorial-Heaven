import React from 'react'
import LoadingCard from './LoadingCard'

const HomeScreenLoader = () => {
  return (
    <div className='px-3 w-full grid py-3 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
    </div>
  )
}

export default HomeScreenLoader