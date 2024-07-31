import React from 'react'
import DangerButton from '../../../common/DangerButton'
import { deleteAccount } from '../../../../services/operations/userAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

const DeleteAccount = ({ modalData, setModalData }) => {

    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className=' flex flex-col gap-y-3 md:gap-y-10'>
            <h3 className='text-base md:text-lg xl:text-xl font-semibold text-danger border-b pb-3'>Delete Account</h3>
            <div className='w-full sm:w-10/12 lg:w-8/12 mx-auto flex flex-col items-start justify-start gap-y-3 md:gap-y-5'>
                <span className='text-base md:text-lg xl:text-xl flex flex-col gap-y-1 text-night-700'>
                    <p >
                        Deleting your account will permanently remove all your videos and assets from Tutorial Heaven.
                        You have the option to request a cancellation of the account deletion within 30 days. Once this period passes, your account and its contents will be irreversibly deleted.
                    </p>
                    <ul className='list-disc pl-5 my-5 flex flex-col gap-1 font-semibold'>
                        <li> All your data, including video tutorials, will be permanently deleted within 30 days.</li>
                        <li>You can cancel the deletion process within 30 days by contacting our support team.</li>
                        <li>You will lose access to all your content and data after 30 days.</li>
                        <li>Contact support '{import.meta.env.VITE_ADMIN_EMAIL}' within 30 days to restore your account.</li>
                    </ul>
                </span>
                <DangerButton action={() => setModalData({
                    title: "Delete Account",
                    description: "Permanently delete all your videos and assets?",
                    primaryButtonText: "Delete Account",
                    primaryButtonHandler: async () => await deleteAccount(token, dispatch, navigate),
                    secondaryButtonText: "Cancel",
                    secondaryButtonHandler: () => setModalData(null)
                })}>
                    Proceed with Account Deletion
                </DangerButton>
            </div>
        </div >
    )
}

export default DeleteAccount