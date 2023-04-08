import React from 'react'
import { Box, LinearProgress, Stack, TextField, Container, IconButton, Divider, CircularProgress, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import { DoneAll, Send, Done, ExpandMore } from '@mui/icons-material'
import axios from 'axios'
import moment from 'moment'


const PingToAdmin = () => {
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")

    function sendMsg() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/ping/add`, {
            message: state.message
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            setState({ ...state, loading: false })
            alert(res.data.msg)
            getMsg()
        }).catch((err) => console.log(err))
    }

    function getMsg() {
        setState({ ...state, loading: true })
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/ping/my_message`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            if (!res.data.success) {
                alert(res.data.msg)
            }
            setState({ ...state, all_messages: res.data.data, loading: false, message: "" })
        })
            .catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if (!token) {
            return
        }
        getMsg()
    }, [token])

    return (
        <Box p={2}>
            <Stack direction={'row'} alignItems='center'>
                <Typography fontWeight="bold" >Ping to Admin</Typography>
            </Stack>
            <Box mt={2} mb={2}>
                <Divider />
            </Box>
            <Box mt={4} >
                <Stack alignItems={'flex-start'} direction={'column'} spacing={2}>
                    <TextField value={state.message} onChange={(e) => setState({ ...state, message: e.target.value })} label="Type your message here" size='small' fullWidth rows={4} multiline />
                    {
                        state.loading ? (
                            <CircularProgress />
                        ) : (
                            <IconButton onClick={sendMsg} disabled={state.message ? false : true} >
                                <Send />
                            </IconButton>
                        )
                    }
                </Stack>

                <Box mt={2} mb={2}>
                    <Divider />
                </Box>

                <Stack direction={'column'} spacing={2}>
                    {
                        state.all_messages ? [...state.all_messages].reverse().map((item, key) => {
                            return (
                                <Accordion key={key} >
                                    <AccordionSummary
                                        sx={{ bgcolor: item.admin_response ? "green" : null, borderRadius: 2 }}
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography variant='caption' >{key + 1}) {item.message} {item.admin_response ? <DoneAll sx={{ color: 'lightgreen', height: 15, width: 15 }} /> : <Done sx={{ color: 'lightgreen', height: 15, width: 15 }} />}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <Typography sx={{ mb: 2 }} fontSize={12} color='gray' >{
                                                item.admin_response ? (
                                                    item.admin_response
                                                ) : "Awaiting to respond"
                                            }</Typography>
                                            <Divider />
                                            <Typography sx={{ mt: 2 }} align='right' fontSize={12} color='gray' >Sent on: {moment(item.createdAt).format('DD-MMMM-YYYY')}</Typography>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        }) : <LinearProgress />
                    }
                </Stack>
            </Box>

        </Box >
    )
}

export default PingToAdmin