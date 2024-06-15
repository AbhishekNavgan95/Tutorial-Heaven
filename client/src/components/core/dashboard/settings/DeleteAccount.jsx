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
        <div className=' flex flex-col gap-y-10'>
            <h3 className='text-xl font-semibold text-danger border-b pb-3'>Delete Account</h3>
            <div className='w-10/12 lg:w-8/12 mx-auto flex flex-col items-start justify-start gap-5'>
                <span className='text-xl flex flex-col gap-2 text-danger'>
                    <p >
                        Deleting your account will permanently remove all your videos and assets from Tutorial Heaven.
                        You have the option to request a cancellation of the account deletion within 30 days. Once this period passes, your account and its contents will be irreversibly deleted.
                    </p>
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