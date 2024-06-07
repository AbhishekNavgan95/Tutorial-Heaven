import React from 'react'
import AuthLayout from '../components/common/AuthLayout'
import poster from "../assets/png/logo-color.png"

const Login = () => {
  return (
    <section className='mx-auto max-w-maxContent'>
      <AuthLayout title={"Log in"} formType={"login"} image={poster} description={"Ready to explore? Sign in to your account now."} />
    </section>
  )
}

export default Login