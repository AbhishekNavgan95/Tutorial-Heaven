import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Button from '../../common/Button';
import { Link } from 'react-router-dom';
import { login } from "../../../services/operations/authAPI"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginForm = () => {

    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        setLoading(true)
        const { email, password } = data;
        const res = await login(email, password, dispatch);
        if (res) {
            toast.success("Log In Successfull", {
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
            })
            navigate("/");
        } else {
            toast.error("Log In Failed", {
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
            })
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='flex flex-col w-full gap-5 relative z-[2]'>
                <span className='flex flex-col gap-1'>
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
                <span className='flex flex-col gap-1'>
                    <span className='flex items-center text-xl border-b border-b-night-900'>
                        <input
                            {...register('password', { required: true })}
                            placeholder='Password'
                            className='w-full py-3 bg-transparent outline-none placeholder:text-night-900'
                            type={hidePassword ? "password" : "text"}
                        />
                        <button type='button' onClick={() => setHidePassword(!hidePassword)} className=''>
                            {
                                hidePassword
                                    ? <IoEyeOutline />
                                    : <IoEyeOffOutline />
                            }
                        </button>
                    </span>
                    {errors.password && <span className='font-semibold underline text-danger'>Password is required</span>}
                </span>
                <p className='self-end font-semibold text-blue-300 transition-all duration-300 cursor-pointer hover:text-blue-400'><Link to={"../forgot-password"}>Forgot Password?</Link></p>
                <Button disabled={loading} type={"submit"} active>Submit</Button>
                <p className='self-center transition-all duration-300'>Don't have an Account? <Link to={"/signup"} className='font-semibold text-blue-300 cursor-pointer hover:text-blue-400'>Sign up</Link></p>
            </div>
        </form>
    )
}

export default LoginForm