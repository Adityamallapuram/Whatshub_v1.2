import { Box, Divider, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, LinearProgress, TextField, IconButton } from '@mui/material'
import axios from 'axios'
import React from 'react'
import moment from 'moment'
import { DoneAll, Send, Done, ExpandMore, Delete } from '@mui/icons-material'

const PingFromUser = () => {
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")

    function getMessages() {
        setState({ ...state, loading: true })
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/ping/get_all`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => setState({ ...state, messages: res.data.data, loading: false, admin_response: "" }))
            .catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if (!token) {
            return
        }
        getMessages()
    }, [token])

    function sendRes(e) {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/ping/respond`, {
            id: e,
            admin_response: state.admin_response
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            alert(res.data.msg)
            if (!res.data.success) {
                console.log(res.data)
            }
            setState({ ...state, loading: false, admin_response: "" })
            getMessages()
        })
            .catch((err) => console.log(err))
    }

    function deleteMsg(e) {
        if (window.confirm(`Are your sure you want to delete this message?`)) {
            setState({ ...state, loading: true })
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/ping/delete`, {
                id: e
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                alert(res.data.msg)
                if (!res.data.success) {
                    console.log(res.data)
                }
                setState({ ...state, loading: false })
                getMessages()
            })
                .catch((err) => console.log(err))
        }
    }

    return (
        <Box p={2} >

            <Box>
                <Stack justifyContent={'space-between'} alignItems='center' direction={'row'} spacing={2}>
                    <Typography fontWeight={'bold'} >Manage Pings</Typography>
                </Stack>
            </Box>
            <Box mt={2} mb={2}>
                <Divider />
            </Box>

            <Box>
                <Stack direction={'column'} spacing={2}>
                    {
                        state.messages ? [...state.messages].reverse().map((item, key) => {
                            return (
                                <Accordion key={key} >
                                    <AccordionSummary
                                        sx={{ bgcolor: item.admin_response ? "green" : 'black', borderRadius: 2 }}
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
                                                ) : (
                                                    <>
                                                        <TextField sx={{ mt: 1 }} value={state.admin_response} onChange={(e) => setState({ ...state, admin_response: e.target.value })} fullWidth label="Enter your response" size="small" rows={4} multiline />
                                                        <Stack mt={2} direction={'row'} justifyContent={'space-between'} spacing={2} alignItems='center'>
                                                            <IconButton onClick={() => sendRes(item.id)} disabled={state.admin_response ? false : true} >
                                                                <Send />
                                                            </IconButton>
                                                        </Stack>
                                                    </>
                                                )
                                            }</Typography>
                                            <Divider />
                                            <Stack mt={2} direction={'row'} justifyContent={'space-between'} spacing={2} alignItems='center'>
                                                <Typography sx={{ mt: 2 }} align='right' fontSize={12} color='gray' >Sent on: {moment(item.createdAt).format('DD-MMMM-YYYY')}</Typography>
                                                <IconButton onClick={() => deleteMsg(item.id)} >
                                                    <Delete sx={{ color: 'red' }} />
                                                </IconButton>
                                            </Stack>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        }) : (
                            <LinearProgress />
                        )
                    }
                </Stack>
            </Box>
        </Box >
    )
}

export default PingFromUser