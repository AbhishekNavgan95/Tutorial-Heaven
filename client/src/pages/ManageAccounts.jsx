import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import { apiConnector } from '../services/apiConnector'
import { dataEndpoints } from '../services/APIs'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { formatDate, formatDistanceToNow } from 'date-fns'
import Button from '../components/common/Button'
import { cancelAccountDeletion } from '../services/operations/authAPI'
import Modal from '../components/common/Modal'

const ManageAccounts = () => {

  const [accounts, setAccounts] = useState([])
  const { token } = useSelector(state => state.auth)
  const [modalData, setModalData] = useState(null)

  const fetchAccounts = async () => {
    try {
      const response = await apiConnector("GET", dataEndpoints.GET_ACCOUNTS, null, {
        Authorization: `Bearer ${token}`
      })

      setAccounts(response.data.data)
    } catch (error) {
      toast.error("Unable to get accounts", {
        style: {
          border: "1px solid #5252B7",
          padding: "8px 16px",
          color: "#DFE2E2",
          background: "#5252B7",
        },
        iconTheme: {
          primary: "#5252B7",
          secondary: "#DFE2E2",
        },
      });
      console.log("error : ", error)
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, [])

  return (
    <div className='w-full lg:w-8/12 mx-auto py-5 md:py-14 '>
      <h4 className='text-lg lg:text-xl border-b border-blue-300 text-center md:text-start pb-3 font-semibold text-blue-300'>Manage Accounts</h4>
      <div className='mt-5 overflow-x-scroll'>
        {/* table */}
        <table className='w-full rounded-lg overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-blue-300 text-white'>
              <th className='py-2 px-4 text-start'>Name</th>
              <th className='py-2 px-4 text-start'>Email</th>
              <th className='py-2 px-4 text-start'>Role</th>
              <th className='py-2 px-4 text-start'>Deletetion Date</th>
              <th className='py-2 px-4 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody className=''>
            {
              accounts.map((account) => (
                <tr key={account._id} className='border-b border-night-200'>
                  <td className='py-2 px-4 text-nowrap'>{account.firstName} {account.lastName}</td>
                  <td className='py-2 px-4'>{account.email}</td>
                  <td className='py-2 px-4'>{account.accountType}</td>
                  <td className='py-2 px-4'>{account.deletionScheduled ? formatDistanceToNow(new Date(account.deletionDate)) : "-"}</td>
                  {/* <td className='py-2 px-4'>{account.deletionScheduled ? formatDate(account.deletionDate, "dd-mm-yyyy", {}) : "-"}</td> */}
                  <td className='py-2 px-4 flex justify-around'>
                    {
                      <Button
                        active
                        disabled={!account.deletionScheduled}
                        action={() => setModalData({
                          title: "Cancel Account Deletion",
                          description: "Are you sure you want to cancel the deletion of this account?",
                          primaryButtonText: "Cancel Deletion",
                          primaryButtonHandler: async () => await cancelAccountDeletion(account._id, token),
                          secondaryButtonText: "Close",
                          secondaryButtonHandler: () => setModalData(null)
                        })}
                        styles='py-0 w-max'
                      >Cancel</Button>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        modalData && <Modal modalData={modalData} />
      }
    </div>
  )
}

export default ManageAccounts