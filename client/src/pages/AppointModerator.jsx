import React from 'react'
import AppointModeratorForm from '../components/core/dashboard/AppointModerator/AppointModeratorForm'

const AppointModerator = () => {
    return (
        <section className='lg:w-8/12 mx-auto py-5 md:py-14 '>
            <div className='flex flex-col gap-y-5 md:gap-y-10 lg:gap-14'>
                <div className='flex flex-col gap-5'>
                    <h4 className='text-lg lg:text-xl border-b border-blue-300 text-center md:text-start pb-3 font-semibold text-blue-300'>Appoint a new Moderator</h4>
                    <AppointModeratorForm />
                    <div>
                        <h4 className='text-lg lg:text-xl border-b border-blue-300 text-center md:text-start pb-3 font-semibold text-blue-300'>Considerations When Appointing a New Moderator:</h4>
                        <ul className='list-disc list-inside my-3 text-sm md:text-lg'>
                            <li>Misuse of power by a moderator could lead to unfair treatment of users or content.</li>
                            <li>Unauthorized deletion or modification of valuable content could occur.</li>
                            <li>Moderators with high-level access could introduce security vulnerabilities.</li>
                            <li>Personal biases of moderators could lead to favoritism.</li>
                            <li>Poor moderation practices could erode user trust.</li>
                            <li>Improper handling of conflicts by moderators can escalate issues.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className='text-lg lg:text-xl border-b border-blue-300 text-center md:text-start pb-3 font-semibold text-blue-300'>Moderator Responsibilities:</h4>
                        <ul className='list-disc list-inside my-3 text-sm md:text-lg'>
                            <li>Updating or deleting videos of other users.</li>
                            <li>Deleting or archiving videos.</li>
                            <li>Reviewing and taking actions regarding comments on videos.</li>
                            <li>Handling account-related actions such as canceling account deletion requests.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AppointModerator