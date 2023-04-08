import React from 'react'
import { Stack, Typography, Box, Grid, LinearProgress } from '@mui/material'
import { Campaign, SmartToy, Paid, Cake } from '@mui/icons-material'
import axios from 'axios'
import GetUserByToken from '../../utils/GetUserByToken'
import moment from 'moment'

const UserDash = () => {
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")
    const { user_by_token } = GetUserByToken()

    function getDash() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get_user_dashboard`, {
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
                state.data && user_by_token ? (
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={6} lg={6} item>
                            <Box bgcolor='black' borderRadius={3} p={2} >
                                <Stack direction='row' spacing={2} justifyContent='space-between'>
                                    <Box>
                                        <Typography>
                                            Total Campaign
                                        </Typography>
                                        <Typography variant='caption' color='gray' >
                                            {state.data.campaign}
                                        </Typography>
                                    </Box>
                                    <Campaign />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6} lg={6} item>
                            <Box bgcolor='black' borderRadius={3} p={2} >
                                <Stack direction='row' spacing={2} justifyContent='space-between'>
                                    <Box>
                                        <Typography>
                                            Is Bot Running
                                        </Typography>
                                        <Typography variant='caption' color='gray' >
                                            {state.data.bot_campaign ? "🟢" : "🔴"}
                                        </Typography>
                                    </Box>
                                    <SmartToy />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6} lg={6} item>
                            <Box bgcolor='black' borderRadius={3} p={2} >
                                <Stack direction='row' spacing={2} justifyContent='space-between'>
                                    <Box>
                                        <Typography>
                                            Plan
                                        </Typography>
                                        <Typography variant='caption' color='gray' >
                                            {user_by_token.plan ? JSON.parse(user_by_token.plan).name + ": " + user_by_token.left_msg + " msgs left" : "NA"}
                                        </Typography>
                                    </Box>
                                    <Paid />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6} lg={6} item>
                            <Box bgcolor='black' borderRadius={3} p={2} >
                                <Stack direction='row' spacing={2} justifyContent='space-between'>
                                    <Box>
                                        <Typography>
                                            Joined Date
                                        </Typography>
                                        <Typography variant='caption' color='gray' >
                                            {moment(user_by_token.created_at).format("DD-MMMM-YYYY")}
                                        </Typography>
                                    </Box>
                                    <Cake />
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                ) : <LinearProgress />
            }
        </Box>
    )
}

export default UserDash