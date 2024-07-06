import React from 'react'
import LoginForm from '../core/auth/LoginForm'
import SignupForm from '../core/auth/SignupForm'
import OTPForm from '../core/auth/OTPForm'
import ForgotPasswordForm from '../core/auth/ForgotPasswordForm'
import ResetPasswordForm from '../core/auth/ResetPasswordForm'
import ModeratorSignupForm from '../core/auth/ModeratorSignupForm'
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL

const AuthLayout = ({ title, image, formType, description, token }) => {
  return (
    <div className={` min-h-screen flex flex-col justify-center gap-5 w-full items-center px-3`}>
      <section className={`flex ${(formType === "signup" || formType === "moderator-signup" || formType === "forgot-password") ? "flex-row-reverse" : ""} items-center justify-center gap-24 w-full`}>
        <div className='flex flex-col items-center lg:items-start w-10/12 sm:w-6/12 md:w-6/12 lg:w-4/12 gap-5 py-10 relative'>
          <h3 className='font-thin text-center lg:text-start text-5xl xl:text-5xl text-blue-300 relative z-[2]'>{title}</h3>
          <p className='mt-3 text-center lg:text-start text-sm sm:text-base lg:text-lg xl:text-xl text-blue-300 relative z-[2]'>{description}</p>
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
          {
            formType === "moderator-signup" && <ModeratorSignupForm token={token} />
          }
        </div>
        <div className='relative hidden lg:block lg:w-5/12'>
          <img loading='lazy' src={image} className='max-w-full min-w-full aspect-square shadow-sm border-4 border-blue-300 relative z-[2]' alt="" />
          <span className='absolute top-0 w-full h-full bg-blue-100 rounded-full random-move-2 blur-3xl'></span>
        </div>
      </section>
      <p className='text-sm md:text-lg lg:text-xl text-center px-5 py-2 rounded-full'>For account-related queries, contact us at <a className='underline text-blue-300  font-semibold' href={`mailto:${ADMIN_EMAIL}`}>{ADMIN_EMAIL}</a>.</p>
    </div>
  )
}

export default AuthLayout