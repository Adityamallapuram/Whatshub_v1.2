import React from 'react'
import { Box, Divider, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import GetUserByToken from '../../../utils/GetUserByToken'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const UpdateProfile = () => {
    const { user_by_token } = GetUserByToken()
    const [user, setUser] = React.useState({})
    React.useEffect(() => {
        if (!user_by_token) {
            return
        }
        setUser({ ...user_by_token })
    }, [user_by_token])
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")
    const history = useHistory()

    function updateUser() {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/update`, user, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            alert(res.data.msg)
            localStorage.removeItem(process.env.REACT_APP_TOKEN + "_user")
            history.push('/user')
        }).catch((err) => console.log(err))
    }

    return (
        <Box p={2} >
            <Stack direction={'row'} alignItems='center'>
                <Typography fontWeight="bold" >Update Profile</Typography>
            </Stack>
            <Box mt={2} mb={2}>
                <Divider />
            </Box>

            {
                user.email ? (
                    <Stack direction={'column'} spacing={2}>
                        <TextField onChange={(e) => setUser({ ...user, name: e.target.value })} value={user.name} label="Name" size='small' fullWidth />
                        <TextField onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} label="Email" size='small' fullWidth />
                        <TextField onChange={(e) => setUser({ ...user, new_password: e.target.value })} helperText='Leave it blank if you dont wanna change the password' label="Password" size='small' fullWidth />

                        <LoadingButton onClick={updateUser} fullWidth variant='contained' size='small' >Update</LoadingButton>
                    </Stack>
                ) : (
                    <LinearProgress />
                )
            }
        </Box>
    )
}

export default UpdateProfile