import { Add, Delete, Surfing } from '@mui/icons-material'
import { Box, Button, CircularProgress, Dialog, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios'
import qrcode from 'qrcode'
import moment from 'moment'
import { LoadingButton } from '@mui/lab'

const Instance = () => {
    const [state, setState] = React.useState({
        dialog_qr: false
    })
    const random = Date.now()
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")
    const [qr, setQR] = React.useState("")
    const [qrLoad, setQrLoad] = React.useState(false)

    const [ins, setIns] = React.useState([])

    function getList() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/instance/get_all_token`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            if (res.data.success) {
                setIns(res.data.data)
            } else alert(res.data.msg || "something went wrong")
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if (!token) return
        getList()
    }, [token])


    function qrtoBase64(qr) {
        // console.log({ rec_in_qr: qr })
        qrcode.toDataURL(qr, (err, src) => {
            var base64Data = src.replace(/^data:image\/png;base64,/, "")
            setQR(base64Data)
        });
    }

    function getQRFromDb() {
        const timer = setInterval(async () => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/instance/get_one`, { client_id: random }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                console.log(res.data.data)
                qrtoBase64(res.data.data.qr)
                if (res.data.data.status === 'ready') {
                    alert("Login Success")
                    setState({ ...state, dialog_qr: false })
                    getList()
                    // botState.setData({ ...botState.data, running_bot: true, bot_data: botState.data.reply })
                    clearInterval(timer)
                }
            }).catch(((err) => console.log(err)))
        }, 3000)
    }


    function addQR() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/instance/add`, {
            client_id: random
        }, {
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
        }).catch((er) => console.log(er))
    }


    function delIns(e) {
        if (window.confirm("Are you sure?")) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/instance/del`, {
                id: e
            }, { headers: { Authorization: "Bearer " + token } })
                .then((res) => {
                    alert(res.data.msg)
                    getList()
                }).catch((err) => console.log(err))
        }
    }

    return (
        <Box p={2}>

            <Dialog open={state.dialog_qr} onClose={() => setState({ ...state, dialog_qr: false })}>
                {
                    state.loading || qrLoad ? (
                        <CircularProgress />
                    ) : (
                        qr ? <img src={`data:image/png;base64,${qr}`} /> : <Stack alignItems={'center'}> <CircularProgress /></Stack>
                    )
                }
            </Dialog>


            <Box p={2} borderRadius={2} bgcolor={'action.hover'}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography fontWeight={'bold'} variant='h5' >Instances</Typography>
                    <LoadingButton
                        loading={state.loading}
                        onClick={addQR}
                        variant='contained' sx={{ borderRadius: 2 }} size='small' startIcon={<Add />} >Add Instance</LoadingButton>
                </Stack>
            </Box>

            <Box mt={4}>
                <Stack direction={'column'} spacing={2}>
                    {ins && ins.map((i, key) => {
                        return (
                            <Box key={key} p={2} borderRadius={2} bgcolor={'white'}>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <Stack direction={'column'}>
                                        <Typography color={'black'} >+{i.mobile}</Typography>
                                        <Typography variant='caption' color={'gray'} >{i.status}</Typography>
                                    </Stack>

                                    <Stack alignItems={'center'} direction={'row'} spacing={2}>
                                        <Typography variant='caption' color={'gray'} >{moment(i.createdAt).format("DD/MM/YY hh:mm:A")}</Typography>
                                        <IconButton onClick={() => delIns(i.id)}  >
                                            <Delete color='error' />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Box>
                        )
                    })}
                </Stack>
            </Box>
        </Box>
    )
}

export default Instance