import { Delete, Reply } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Stack, Button, Typography, Divider, Dialog, TextField, IconButton, CircularProgress } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { BotContext } from '../../../../context/BotContext'
import qrcode from 'qrcode'


export const AddReply = () => {
    const botState = React.useContext(BotContext)
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")
    const [qr, setQR] = React.useState("")
    const [qrLoad, setQrLoad] = React.useState(false)

    function qrtoBase64(qr) {
        // console.log({ rec_in_qr: qr })
        qrcode.toDataURL(qr, (err, src) => {
            var base64Data = src.replace(/^data:image\/png;base64,/, "")
            setQR(base64Data)
        });
    }

    function getQRFromDb() {
        const timer = setInterval(async () => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/bot/get_one`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                // console.log(res.data.data)
                qrtoBase64(res.data.data.qr_code)
                if (res.data.data.login_status) {
                    alert("Login Success")
                    botState.setData({ ...botState.data, running_bot: true, bot_data: botState.data.reply })
                    clearInterval(timer)
                }
            }).catch(((err) => console.log(err)))
        }, 3000)
    }


    function addBot() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/bot/add_one`, botState.data, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            if (!res.data.success) {
                alert(res.data.msg)
                setState({ ...state, loading: false })
                return
            }
            setState({ ...state, loading: false, dialog_qr: true })
            getQRFromDb()
        })
            .catch((er) => console.log(er))
    }

    return (
        <div>

            <Dialog open={state.dialog_qr} onClose={() => setState({ ...state, dialog_qr: false })}>
                <Box p={2}>
                    {
                        state.loading || qrLoad ? (
                            <CircularProgress />
                        ) : (
                            qr ? <img src={`data:image/png;base64,${qr}`} /> : <Stack alignItems={'center'}> <CircularProgress /></Stack>
                        )
                    }
                    <Box mt={2}>
                        <Typography align='center' >Scan this QR from your WhstaApp</Typography>
                    </Box>
                </Box>
            </Dialog>


            <Box onClick={() => setState({ ...state, dialog: true })} sx={{ textTransform: 'none' }} fullWidth component={Button} p={4} border={0.5} borderRadius={2}>
                <Typography>Add a bot</Typography>
            </Box>

            <Dialog fullWidth open={state.dialog} onClose={() => setState({ ...state, dialog: false })}>
                <Box p={2}>
                    <Typography align='center' >Whats on your mind?</Typography>
                    <Stack mt={3} direction={'column'} spacing={2}>
                        <TextField multiline value={state.in} onChange={(e) => setState({ ...state, in: e.target.value })} label="Enter incoming message" fullWidth size='small' />
                        <TextField multiline value={state.out} onChange={(e) => setState({ ...state, out: e.target.value })} label="Enter outgoing message" fullWidth size='small' />
                        <Button
                            disabled={state.in && state.out ? false : true}
                            onClick={() => {
                                if (botState.data.reply.length > 9) {
                                    return alert("Max 10 bots are allowed")
                                }
                                botState.setData({
                                    ...botState, reply: [...botState.data.reply, {
                                        id: Math.floor(Math.random() * 90000) + 10000,
                                        in: state.in,
                                        out: state.out
                                    }]
                                })
                                setState({ ...state, in: "", out: "", dialog: false })
                            }} size='small' variant='contained' >Add</Button>
                    </Stack>
                </Box>
            </Dialog>

            {
                botState.data.reply.length > 0 &&
                <>
                    <Box mt={2} mb={2}>
                        <Divider />
                    </Box>

                    <Stack direction={'column'} spacing={2}>
                        {
                            botState.data.reply.map((i, key) => {
                                return (
                                    <Box style={{ position: 'relative' }} key={key} borderRadius={4} p={2} bgcolor='black'>
                                        <Stack alignItems={'flex-start'} >
                                            <Box minWidth={60} mr={'40%'} bgcolor={'#3f50b5'} p={1} borderRadius={2}>
                                                <Typography variant='caption' color='black' >{i.in}</Typography>
                                            </Box>
                                        </Stack>
                                        <Stack mt={1} alignItems={'flex-end'} >
                                            <Box ml={'40%'} bgcolor={'#262626'} p={1} borderRadius={2}>
                                                <Box minWidth={60} bgcolor={'#273550'} p={1} borderRadius={2}>
                                                    <Reply sx={{ color: 'gray', height: 20, width: 20 }} />
                                                    <Typography fontSize={10} color='gray' >{i.in}</Typography>
                                                </Box>
                                                <Box minWidth={60} mr={1} mt={1} >
                                                    <Typography variant='caption' color='gray' >{i.out}</Typography>
                                                </Box>
                                            </Box>
                                        </Stack>
                                        <Box style={{ position: 'absolute', top: 0, bottom: 0, right: 0, textAlign: 'center' }}>
                                            <IconButton onClick={() => {
                                                const filteredReply = botState.data.reply.filter((item) => item.id !== i.id)
                                                botState.setData({
                                                    ...botState, reply: filteredReply
                                                })
                                            }} color='error' >
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </Box >
                                )
                            })
                        }
                    </Stack>

                    <Box mt={2}>
                        <LoadingButton loading={state.loading} onClick={addBot} size='small' variant='contained' fullWidth >Scan QR</LoadingButton>
                    </Box>

                </>
            }
        </div >
    )
}
