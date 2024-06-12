import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UpdateProfilePic from '../components/core/dashboard/settings/UpdateProfilePic';

const Settings = () => {

  const { user } = useSelector(state => state.user);

  return (
    <div className='w-8/12 mx-auto pb-10'>
      <div className='flex flex-col gap-10 divide-y divide-blue-300'>

        <UpdateProfilePic user={user} />
        <UpdateProfilePic user={user} />

      </div>
    </div>
  )
}

export default Settings