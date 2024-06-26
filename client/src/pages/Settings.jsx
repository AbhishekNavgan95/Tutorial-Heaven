import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UpdateProfilePic from '../components/core/dashboard/settings/UpdateProfilePic';
import UpdateUserName from '../components/core/dashboard/settings/UpdateUserName';
import UpdatePassword from '../components/core/dashboard/settings/UpdatePassword';
import DeleteAccount from '../components/core/dashboard/settings/DeleteAccount';
import Modal from '../components/common/Modal';

const Settings = () => {

  const [modalData, setModalData] = useState(null)
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='lg:w-8/12 mx-auto py-5 md:py-14'>
      <div className='flex flex-col gap-14'>
        <UpdateProfilePic user={user} />
        <UpdateUserName />
        <UpdatePassword />
        <DeleteAccount modalData={modalData} setModalData={setModalData} />
      </div>
      {
        modalData && <Modal modalData={modalData} />
      }
    </div>
  )
}

export default Settings