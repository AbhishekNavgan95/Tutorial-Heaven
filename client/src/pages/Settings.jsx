import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UpdateProfilePic from '../components/core/dashboard/settings/UpdateProfilePic';
import UpdateUserName from '../components/core/dashboard/settings/UpdateUserName';
import UpdatePassword from '../components/core/dashboard/settings/UpdatePassword';

const Settings = () => {

  const { user } = useSelector(state => state.user);

  return (
    <div className='w-8/12 mx-auto py-14'>
      <div className='flex flex-col gap-14'>

        <UpdateProfilePic user={user} />
        <UpdateUserName />
        <UpdatePassword />

      </div>
    </div>
  )
}

export default Settings