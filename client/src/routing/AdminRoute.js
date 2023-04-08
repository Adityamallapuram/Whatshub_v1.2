import axios from 'axios';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LinearProgress } from '@mui/material'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [state, setState] = React.useState({
        loading: true
    })

    function checkAdmin() {
        const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get_admin_by_token`, {
            headers: {
                Authorization: "Beare " + token
            }
        }).then((res) => {
            if (!res.data.success) {
                setState({ ...state, loading: false, isLogin: false })
            } else {
                setState({ ...state, loading: false, isLogin: true })
            }
        })
    }

    React.useEffect(() => {
        checkAdmin()
    }, [])

    return (
        state.loading ? (
            <LinearProgress />
        ) : (
            <Route {...rest} render={props => (
                state.isLogin ?
                    <Component {...props} />
                    : <Redirect to="/admin/login" />
            )} />
        )
    );
};

export default PrivateRoute;