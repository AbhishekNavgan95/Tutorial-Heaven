import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns';
import { getCloudinaryUrl } from '../utils/getCloudinaryUrl'

const Profile = () => {

    const [userImaege, setUserImage] = useState(null);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        if (user?.image?.url) {
            setUserImage(getCloudinaryUrl(user?.image?.url, 150, 150))
        }
    }, [])

    return (
        <div className='lg:w-8/12 mx-auto self-center'>
            <div className='flex flex-col xl:flex-row justify-start items-center md:items-start xl:items-center gap-y-5 md:gap-y-10 gap-x-10'>
                <span className='w-max flex justify-center min-w-[150px] bg-night-50 aspect-square rounded-full overflow-hidden border-blue-300 border-4 '><img src={userImaege} loading='lazy' className='max-w-[120px] min-w-[120px] md:max-w-[150px] object-cover' alt="" /></span>
                <span className=' text-sm md:text-base xl:text-xl grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-x-10 gap-y-5 md:gap-y-10'>
                    <span className='flex flex-col md:items-start items-center gap-1'>
                        <h4 className='font-semibold text-blue-300'>Name</h4>
                        <p className='text-night-900'>{user?.firstName} {user?.lastName}</p>
                    </span>
                    <span className='flex flex-col md:items-start items-center gap-1'>
                        <h4 className='font-semibold text-blue-300'>Email</h4>
                        <p className='text-night-900'>{user?.email}</p>
                    </span>
                    <span className='flex flex-col md:items-start items-center gap-1'>
                        <h4 className='font-semibold text-blue-300'>Total Videos</h4>
                        <p className='text-night-900'>{user?.posts?.length}</p>
                    </span>
                    {
                        user?.createdAt &&
                        <span className='flex flex-col md:items-start items-center gap-1'>
                            <h4 className='font-semibold text-blue-300'>Joined</h4>
                            <p className='text-night-900'>{formatDistanceToNow(new Date(user?.createdAt), { addSuffix: true })}</p>
                        </span>
                    }
                </span>
            </div>
        </div>
    )
}

export default Profile