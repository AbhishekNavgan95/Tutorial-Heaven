import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const PublicRoute = ({ children }) => {

    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && user) {
            navigate("/")
        }
    }, [token, user])

    return children;
}

export default PublicRoute