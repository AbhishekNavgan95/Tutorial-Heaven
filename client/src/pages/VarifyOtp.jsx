import React from 'react'
import AuthLayout from '../components/common/AuthLayout'
import poster from "../assets/png/logo-color.png"

const VarifyOtp = () => {
  return (
    <section className='mx-auto'>
      <AuthLayout title={"Varify OTP"} formType={"otp"} image={poster} description={"Enter the OTP sent to your email to complete the verification process."} />
    </section>
  )
}

export default VarifyOtp