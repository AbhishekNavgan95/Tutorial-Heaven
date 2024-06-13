import React from 'react'
import LoginForm from '../core/auth/LoginForm'
import SignupForm from '../core/auth/SignupForm'
import OTPForm from '../core/auth/OTPForm'
import ForgotPasswordForm from '../core/auth/ForgotPasswordForm'
import ResetPasswordForm from '../core/auth/ResetPasswordForm'
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL

const AuthLayout = ({ title, image, formType, description }) => {
  return (
    <div className={` min-h-screen flex flex-col justify-center gap-10 w-full items-center`}>
      <span className={`flex ${(formType === "signup" || formType === "forgot-password") ? "flex-row-reverse" : ""} items-center justify-center gap-32 w-full`}>
        <div className='flex flex-col w-[40%] gap-5 py-10 relative'>
          <h3 className='font-thin text-7xl text-blue-300 relative z-[2]'>{title}</h3>
          <p className='mt-3 text-xl text-blue-300  relative z-[2]'>{description}</p>
          {
            formType === "login" && <LoginForm />
          }
          {

            formType === "signup" && <SignupForm />
          }
          {

            formType === "otp" && <OTPForm />
          }
          {
            formType === "forgot-password" && <ForgotPasswordForm />
          }
          {
            formType === "reset-password" && <ResetPasswordForm />
          }
          {/* <span className='absolute top-0 right-0 w-full h-full transition-all duration-300 rounded-full aspect-square random-move blur-3xl bg-blue-50'></span> */}
        </div>
        <div className='relative'>
          <img src={image} className='max-w-[500px] shadow-sm border-4 border-blue-300 relative z-[2]' alt="" />
          <span className='absolute top-0 w-full h-full bg-blue-100 rounded-full random-move-2 blur-3xl'></span>
        </div>
      </span>
      <p className='text-xl px-5 py-2 text-blue-300 rounded-full'>For account-related queries, contact us at <a className='underline font-semibold' href={`mailto:${ADMIN_EMAIL}`}>{ADMIN_EMAIL}</a>.</p>
    </div>
  )
}

export default AuthLayout