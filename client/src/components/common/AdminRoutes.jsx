import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_TYPES } from '../../services/constants';

const AdminRoutes = ({ children }) => {

    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.accountType === USER_TYPES.ADMIN) {
            navigate("/");
            return;
        }
    }, [user?.accountType])

    return (
        <>
            {
                user?.accountType === USER_TYPES.ADMIN ? children : null
            }
        </>
    )
}

export default AdminRoutes