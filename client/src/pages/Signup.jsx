import React from 'react'
import AuthLayout from '../components/common/AuthLayout'
import poster from "../assets/png/logo-color.png"

const Signup = () => {
  return (
    <section className='mx-auto max-w-maxContent'>
      <AuthLayout title={"Sign up"} formType={"signup"} image={poster} description={"Sign up now to access exclusive features and content."} />
    </section>
  )
}

export default Signup