import { Box, Stack, Typography, Divider, ImageList, Button, Dialog, IconButton, LinearProgress, CircularProgress } from '@mui/material'
import React from 'react'
import axios from 'axios'
import { Close, WhatsApp } from '@mui/icons-material'
import DialogPlan from './DialogPlan'
import GetUserByToken from '../../../utils/GetUserByToken'
import GetWebSet from '../../../utils/GetWebSet'

const OptPlan = () => {
    const [state, setState] = React.useState({
        dialog: false
    })
    const { user_by_token } = GetUserByToken()
    const { web_set } = GetWebSet()

    function getPlans() {
        setState({ ...state, loading: true })
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/plan/get`)
            .then((res) => {
                setState({ ...state, loading: false, plans: res.data.data })
            })
            .catch((er) => console.log(er))
    }

    React.useEffect(() => {
        getPlans()
    }, [])



    return (
        <Box p={2} >
            <Stack direction={'row'} alignItems='center'>
                <Typography fontWeight="bold" >Manage plan</Typography>
            </Stack>
            <Box mt={2} mb={2}>
                <Divider />
            </Box>


            <Dialog fullScreen open={state.dialog} onClose={() => setState({ ...state, dialog: false })}>
                <Box p={2} minHeight={'100vh'} bgcolor={'black'}>
                    <Stack direction={'row'}>
                        <IconButton onClick={() => setState({ ...state, dialog: false })} >
                            <Close />
                        </IconButton>
                    </Stack>
                    <DialogPlan plan={state.plan} web_set={web_set} />
                </Box>
            </Dialog>

            <ImageList
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
                    gridAutoColumns: "minmax(160px, 1fr)",
                    msOverflowStyle: 'none',
                    overflowX: 'scroll',
                    '::-webkit-scrollbar': {
                        width: '10px'
                    },
                    '::-webkit-scrollbar-track': {
                        background: '#4F4F4F',
                        borderRadius: 10
                    },
                    '::-webkit-scrollbar-thumb': {
                        background: "#1B1B1B",
                        borderRadius: 10
                    },
                    '::-webkit-scrollbar-thumb:hover': {
                        background: 'green',
                    }
                }}
            >
                {
                    state.plans ? (
                        <Stack mb={2} spacing={4} direction={'row'}>

                            {
                                state.plans?.map((i, key) => {
                                    return (
                                        <Box onClick={() => setState({ ...state, dialog: true, plan: i })} component={Button} key={key} minWidth={300} borderRadius={3} style={{
                                            background: "linear-gradient(to top right, #000000 74%, green 116%)"
                                        }} p={2}>
                                            <Stack direction={'row'} justifyContent='space-between' spacing={4}>
                                                <Stack alignItems={'flex-start'} direction={'column'}>
                                                    <Typography color='white' fontWeight={'bold'} >{i.name}</Typography>
                                                    <Typography style={{ textTransform: 'none', }} color='gray' variant='caption' >Messages Limit: {i.message_limit}</Typography>
                                                    <Typography style={{ textTransform: 'none', }} color='gray' variant='caption' >Cost: {i.cost} {web_set?.currency_symbol}</Typography>
                                                </Stack>
                                                <WhatsApp sx={{ color: '#25D366', height: 100, width: 100 }} />
                                            </Stack>
                                        </Box>
                                    )
                                })
                            }

                        </Stack>
                    ) : <Box mt={2} mb={2}>
                        <CircularProgress />
                    </Box>
                }
            </ImageList>


            {user_by_token.plan && web_set &&
                <Box mt={2} borderRadius={3} style={{
                    background: "linear-gradient(to top right, #000000 74%, gray 116%)"
                }} p={2}>
                    <Stack direction={'row'} justifyContent='space-between' spacing={4}>
                        <WhatsApp sx={{ color: '#25D366', height: 100, width: 100 }} />
                        <Stack alignItems={'flex-start'} direction={'column'}>
                            <Typography color='orange' fontWeight={'bold'} >You Plan:-</Typography>
                            <Typography color='gray' fontWeight={'bold'} >{JSON.parse(user_by_token.plan).name}</Typography>
                            <Typography style={{ textTransform: 'none', }} color='gray' variant='caption' >Messages Left: {new Intl.NumberFormat('en-US').format(user_by_token.left_msg)}</Typography>
                            <Typography style={{ textTransform: 'none', }} color='gray' variant='caption' >Cost: {JSON.parse(user_by_token.plan).cost} {web_set.currency_symbol}</Typography>
                        </Stack>
                    </Stack>
                </Box>
            }



        </Box>
    )
}

export default OptPlan