import React from 'react'
import AuthLayout from '../components/common/AuthLayout'
import poster from "../assets/png/logo-color.png"

const ResetPassword = () => {
  return (
    <section className='mx-auto'>
      <AuthLayout title={"Reset Password"} formType={"reset-password"} image={poster} description={"Enter a new password to complete the reset process."} />
    </section>
  )
}

export default ResetPassword