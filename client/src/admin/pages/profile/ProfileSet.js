import React from 'react'
import { Box, Stack, Typography, Divider, TextField, LinearProgress } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const ProfileSet = () => {
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")
    const history = useHistory()

    function getEmail() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get_admin_email`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            setState({ ...state, email: res.data.email })
        })
            .catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if (!token) {
            return
        }
        getEmail()
    }, [token])

    function updateProfile() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/change_admin_pw`, state, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            alert(res.data.msg)
            if (res.data.success) {
                localStorage.removeItem(process.env.REACT_APP_TOKEN + "_admin")
                history.push('/admin')
            }
            setState({ ...state, loading: false })
        }).catch((err) => console.log(err))
    }

    return (
        <Box p={2} >
            <Box>
                <Stack justifyContent={'space-between'} alignItems='center' direction={'row'} spacing={2}>
                    <Typography fontWeight={'bold'} >Admin Profile</Typography>
                </Stack>
            </Box>
            <Box mt={2} mb={2}>
                <Divider />
            </Box>

            {
                state.email ? (
                    <Stack direction={'column'} spacing={2}>
                        <TextField onChange={(e) => setState({ ...state, email: e.target.value })} value={state.email} label="Email" fullWidth size='small' />
                        <TextField onChange={(e) => setState({ ...state, new_password: e.target.value })} label="Password" helperText="Leave it blank if you dont wanna change it" fullWidth size='small' />
                        <LoadingButton loading={state.loading} onClick={updateProfile} size='small' fullWidth variant='contained' >Update</LoadingButton>
                    </Stack>
                ) : <LinearProgress />
            }
        </Box>
    )
}

export default ProfileSet