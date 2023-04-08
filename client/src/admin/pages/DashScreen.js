import React from 'react'
import { Stack, Typography, Box, Grid, LinearProgress } from '@mui/material'
import { SupervisedUserCircle, MovieCreation, Message, ReceiptLong } from '@mui/icons-material'
import axios from 'axios'

const DashScreen = () => {
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")

    function getDash() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get_admin_dashboard`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            setState({ data: res.data })
        })
            .catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if (!token) {
            return
        }
        getDash()
    }, [token])

    return (
        <Box p={2} >
            {
                state.data ? (
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={6} lg={6} item>
                            <Box bgcolor='black' borderRadius={3} p={2} >
                                <Stack direction='row' spacing={2} justifyContent='space-between'>
                                    <Box>
                                        <Typography>
                                            Total User
                                        </Typography>
                                        <Typography variant='caption' color='gray' >
                                            {state.data.user}
                                        </Typography>
                                    </Box>
                                    <SupervisedUserCircle />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6} lg={6} item>
                            <Box bgcolor='black' borderRadius={3} p={2} >
                                <Stack direction='row' spacing={2} justifyContent='space-between'>
                                    <Box>
                                        <Typography>
                                            Total Plans
                                        </Typography>
                                        <Typography variant='caption' color='gray' >
                                            {state.data.plan}
                                        </Typography>
                                    </Box>
                                    <MovieCreation />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6} lg={6} item>
                            <Box bgcolor='black' borderRadius={3} p={2} >
                                <Stack direction='row' spacing={2} justifyContent='space-between'>
                                    <Box>
                                        <Typography>
                                            Pending User's Ping
                                        </Typography>
                                        <Typography variant='caption' color='gray' >
                                            {state.data.ping}
                                        </Typography>
                                    </Box>
                                    <Message />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6} lg={6} item>
                            <Box bgcolor='black' borderRadius={3} p={2} >
                                <Stack direction='row' spacing={2} justifyContent='space-between'>
                                    <Box>
                                        <Typography>
                                            Total Orders
                                        </Typography>
                                        <Typography variant='caption' color='gray' >
                                            {state.data.orders}
                                        </Typography>
                                    </Box>
                                    <ReceiptLong />
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                ) : <LinearProgress />
            }
        </Box>
    )
}

export default DashScreen