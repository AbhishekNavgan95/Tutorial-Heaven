import { useState } from 'react';
import React from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../../common/Button';
import { apiConnector } from "../../../../services/apiConnector"
import { useDispatch, useSelector } from 'react-redux';
import { authEndpoints } from '../../../../services/APIs';
import toast from "react-hot-toast"
import { setProgress } from '../../../../slices/loadingBarSlice';

const AppointModeratorForm = () => {

  const { GENERATE_MODERATOR_TOKEN } = authEndpoints

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    setLoading(true)
    dispatch(setProgress(60))
    try {
      const response = await apiConnector("POST", GENERATE_MODERATOR_TOKEN, data, { Authorization: `Bearer ${token}` })
      console.log("response : ", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }

      toast.success(response?.data?.message, {
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
      setValue("email", "")
    } catch (e) {
      console.log("ERROR_GENERATING_MODERATOR_TOKEN : ", e?.response?.data?.message)
      toast.error(e?.response?.data?.message, {
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

    } finally {
      setLoading(false)
      dispatch(setProgress(100))
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className='w-full sm:w-10/12 lg:w-8/12 mx-auto pb-5'>
      <div className='flex flex-col w-full gap-5'>
        <div className='flex flex-col gap-y-3 gap-x-5 w-full'>
          <span className='flex flex-col gap-3 w-full'>
            <input
              {...register("email", { required: true })}
              placeholder='email'
              type="email"
              name='email'
              id='email'
              className='w-full py-3 text-base md:text-lg xl:text-xl bg-transparent border-b outline-none placeholder:text-blue-300 text-night-900 border-b-blue-300'
            />
            {
              errors.email && <span className='font-semibold underline text-danger'>Email is required</span>
            }
          </span>
          <Button disabled={loading} styles={"w-max"} active>Submit</Button>
        </div>
      </div>
    </form>
  )
}

export default AppointModeratorForm