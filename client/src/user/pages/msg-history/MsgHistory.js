import { Delete } from '@mui/icons-material'
import { Box, Divider, Typography, Stack, IconButton, LinearProgress } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React from 'react'

const MsgHistory = () => {
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")

    function getCam() {
        setState({ ...state, loading: true })
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get_campaign`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            if (!res.data.success) {
                alert(res.data.msg)
            }
            setState({ ...state, campaign: res.data.data, loading: false })
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if (!token) {
            return
        }
        getCam()
    }, [token])

    function delCam(e) {
        if (window.confirm("Are your sure?")) {
            setState({ ...state, loading: true })
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/delete_campaign`, {
                id: e
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                alert(res.data.msg)
                getCam()
                setState({ ...state, loading: false })
            }).catch((err) => console.log(err))
        }
    }

    return (
        <Box p={2} >
            <Stack direction={'row'} alignItems='center'>
                <Typography fontWeight="bold" >Campaign History</Typography>
            </Stack>
            <Box mt={2} mb={2}>
                <Divider />
            </Box>

            {
                state.loading ? (
                    <LinearProgress />
                ) : (
                    state.campaign?.length > 0 ? (
                        <Stack direction={'column'} spacing={2}>
                            {
                                state.campaign?.map((i, key) => {
                                    return (
                                        <Box key={key} bgcolor={'black'} p={2} borderRadius={2}>
                                            <Stack direction={'row'} justifyContent='space-between' spacing={2} alignItems='center'>
                                                <Stack direction={'column'}>
                                                    <Typography>{moment(i.created_at).fromNow()}</Typography>
                                                    <Typography color='gray' variant='caption'>Total: {i.total_msg}, Sent: {i.sent_msg}</Typography>
                                                </Stack>
                                                <IconButton onClick={() => delCam(i.id)} color='error' >
                                                    <Delete />
                                                </IconButton>
                                            </Stack>
                                        </Box>
                                    )
                                })
                            }
                        </Stack>
                    ) : <Typography variant='caption' color='gray'>No Plan found</Typography>
                )
            }


        </Box>
    )
}

export default MsgHistory