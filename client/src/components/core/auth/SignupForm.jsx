import React, { useState } from 'react'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Button from '../../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux"
import { setSignupData } from "../../../slices/authSlice"
import { sendOtp } from '../../../services/operations/authAPI';
import toast from 'react-hot-toast';

const SignupForm = () => {

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { register, setValue, getValues, formState: { errors }, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    setLoading(true)
    // save signup data for next API call
    dispatch(setSignupData(data));
    // call API for OTP
    const res = await sendOtp(data, dispatch);
    if (res) {
      toast.success("OTP sent!", {
        style: {
          border: '1px solid #5252B7',
          padding: '8px 16px',
          color: '#DFE2E2',
          background: "#5252B7"
        },
        iconTheme: {
          primary: '#5252B7',
          secondary: '#DFE2E2',
        },
      });
      navigate("../varify-otp")
    } else {
      toast.error("OTP cannot be sent", {
        style: {
          border: '1px solid #5252B7',
          padding: '8px 16px',
          color: '#DFE2E2',
          background: "#5252B7"
        },
        iconTheme: {
          primary: '#5252B7',
          secondary: '#DFE2E2',
        },
      });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className='flex flex-col w-full gap-3 relative z-[2]'>
        <div className='flex gap-5'>
          <span className='flex flex-col w-full gap-1'>
            <input
              {...register('firstName', { required: true })}
              placeholder='First Name'
              className='w-full py-3 text-xl bg-transparent border-b outline-none placeholder:text-night-900 text-night-900 border-b-night-900'
              type="text"
            />
            {
              errors.firstName && <span className='font-semibold underline text-danger'>First Name is required</span>
            }
          </span>
          <span className='flex flex-col w-full gap-1'>
            <input
              {...register('lastName', { required: true })}
              placeholder='Last Name'
              className='w-full py-3 text-xl bg-transparent border-b outline-none placeholder:text-night-900 text-night-900 border-b-night-900'
              type="text"
            />
            {
              errors.lastName && <span className='font-semibold underline text-danger'>Last Name is required</span>
            }
          </span>
        </div>
        <span className='flex flex-col w-full gap-1'>
          <input
            {...register('email', { required: true })}
            placeholder='Email'
            className='w-full py-3 text-xl bg-transparent border-b outline-none placeholder:text-night-900 text-night-900 border-b-night-900'
            type="email"
          />
          {
            errors.email && <span className='font-semibold underline text-danger'>Email is required</span>
          }
        </span>
        <span className='flex flex-col w-full gap-1'>
          <span className='flex items-center text-xl border-b placeholder:text-night-900 border-b-night-900'>
            <input
              {...register('password', { required: true })}
              placeholder='Password'
              className='w-full py-3 bg-transparent outline-none placeholder:text-night-900'
              type={hidePassword ? "password" : "text"}
            />
            <button type='button' onClick={() => setHidePassword(!hidePassword)} className='p-2 text-2xl'>
              {
                hidePassword
                  ? <IoEyeOutline />
                  : <IoEyeOffOutline />
              }
            </button>
          </span>
          {
            errors.password && <span className='font-semibold underline text-danger'>Password is required</span>
          }
        </span>
        <span className='flex flex-col w-full gap-1'>
          <span className='flex items-center text-xl border-b border-b-night-900'>
            <input
              {...register('confirmPassword', { required: true })}
              placeholder='Confirm Password'
              className='w-full py-3 bg-transparent outline-none placeholder:text-night-900'
              type={hideConfirmPassword ? "password" : "text"}
            />
            <button type='button' onClick={() => setHideConfirmPassword(!hideConfirmPassword)} className='p-2 text-2xl'>
              {
                hideConfirmPassword
                  ? <IoEyeOutline />
                  : <IoEyeOffOutline />
              }
            </button>
          </span>
          {
            errors.confirmPassword && <span className='font-semibold underline text-danger'>Confirm Password is required</span>
          }
        </span>
        <Button disabled={loading} type={"submit"} active >Submit</Button>
        <p className='self-center transition-all duration-300'>Already have an Account? <Link to={"/login"} className='font-semibold text-blue-300 cursor-pointer hover:text-blue-400'>Log in</Link></p>
      </div>
    </form>
  )
}

export default SignupForm