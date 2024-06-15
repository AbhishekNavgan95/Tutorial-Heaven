import React from 'react'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns';

const Profile = () => {

    const { user } = useSelector(state => state.user);
    console.log("user : ", user);

    return (
        <div className=' lg:w-8/12 mx-auto py-10'>
            <div className='flex flex-col xl:flex-row justify-start items-start xl:items-center gap-10'>
                <span className=''><img src={user?.image?.url} className='max-w-[150px] object-cover aspect-square rounded-full border-4 border-blue-300 ' alt="" /></span>
                <span className='grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-x-10 gap-y-10'>
                    <span className='flex flex-col gap-1'>
                        <h4 className='text-xl font-semibold text-blue-300'>Name</h4>
                        <p className='text-xl text-night-900'>{user?.firstName} {user?.lastName}</p>
                    </span>
                    <span className='flex flex-col gap-1'>
                        <h4 className='text-xl font-semibold text-blue-300'>Email</h4>
                        <p className='text-xl text-night-900'>{user?.email}</p>
                    </span>
                    <span className='flex flex-col gap-1'>
                        <h4 className='text-xl font-semibold text-blue-300'>Total Posts</h4>
                        <p className='text-xl text-night-900'>{user?.posts?.length}</p>
                    </span>
                    {
                        user?.createdAt &&
                        <span className='flex flex-col gap-1'>
                            <h4 className='text-xl font-semibold text-blue-300'>Joined</h4>
                            <p className='text-xl text-night-900'>{formatDistanceToNow(new Date(user?.createdAt), { addSuffix: true })}</p>
                        </span>
                    }
                </span>
            </div>
        </div>
    )
}

export default Profile