import React from 'react'
import AuthLayout from '../components/common/AuthLayout'
import poster from "../assets/png/logo-color.png"

const ForgotPassword = () => {
    return (
        <section className='mx-auto max-w-maxContent'>
            <AuthLayout title={"Forgot Password?"} formType={"forgot-password"} image={poster} description={"No worries, enter your email to reset your password."} />
        </section>
    )
}

export default ForgotPassword