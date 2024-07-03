import React from 'react'
import AuthLayout from '../components/common/AuthLayout'
import poster from "../assets/png/logo-color.png"
import { useNavigate, useParams } from 'react-router-dom'

const ModeratorSignUp = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  if (!token) {
    navigate("/");
    return 
  }

  return (
    <section className='mx-auto max-w-maxContent'>
      <AuthLayout token={token} title={"Sign up - Moderator"} formType={"moderator-signup"} image={poster} description={"Sign up now to access exclusive features and content."} />
    </section>
  )
}

export default ModeratorSignUp