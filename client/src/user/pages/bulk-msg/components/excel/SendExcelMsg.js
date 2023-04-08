import React from 'react'
import { Box, Button, Stack, Divider, Accordion, AccordionSummary, Typography, AccordionDetails, Grid, Slider, Dialog, CircularProgress } from '@mui/material'
import { SendBulkContext } from '../../../../../context/SendBulkContext'
import { ExpandMore } from '@mui/icons-material'
import DelayMsg from '../DelayMsg'
import axios from 'axios'
import { LoadingButton } from '@mui/lab'
import qrcode from 'qrcode'
import { useHistory } from 'react-router-dom'

const SendExceleMsg = () => {
    const sendBulk = React.useContext(SendBulkContext)
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")
    const [state, setState] = React.useState({})
    const [qr, setQR] = React.useState("")
    const history = useHistory()
    const [qrLoad, setQrLoad] = React.useState(false)


    function qrtoBase64(qr) {
        // console.log({ rec_in_qr: qr })
        qrcode.toDataURL(qr, (err, src) => {
            var base64Data = src.replace(/^data:image\/png;base64,/, "")
            setQR(base64Data)
        });
    }

    function getQRFromDb(unique_id) {
        const timer = setInterval(async () => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/campaign/get_one`, {
                unique_id: unique_id
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                qrtoBase64(res.data.data.qr_code)
                if (res.data.data.login_status) {
                    alert("Login Success")
                    history.push("/user?page=2")
                    clearInterval(timer)
                }
            }).catch(((err) => console.log(err)))
        }, 3000)
    }


    async function sendExcel() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/campaign/send_whstapp`, sendBulk.data, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            if (!res.data.success) {
                alert(res.data.msg)
                setState({ ...state, loading: false })
                return
            }
            setState({ ...state, loading: false, dialog: true })
            getQRFromDb(res.data.unique_id)
        }).catch((err) => {
            alert("Something went wrong try again!")
            setState({ ...state, loading: false })
            console.log(err)
        })
    }

    return (
        <div>
            <Dialog open={state.dialog} onClose={() => setState({ ...state, dialog: false })}>
                <Box p={2}>
                    {
                        state.loading || qrLoad ? (
                            <CircularProgress />
                        ) : (
                            qr && <img src={`data:image/png;base64,${qr}`} />
                        )
                    }
                    <Box mt={2}>
                        <Typography align='center' >Scan this QR from your WhstaApp</Typography>
                    </Box>
                </Box>
            </Dialog>

            <Box mb={2}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}>
                        <Typography>{sendBulk.data.excel_array.length} message(s) to be sent.</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} >
                            {
                                sendBulk.data.excel_array.map((i, key) => {
                                    return (
                                        <Grid key={key} xs={12} sm={6} lg={3} item>
                                            <Box borderRadius={2} bgcolor='black' p={2}>
                                                <Stack direction={'column'}>
                                                    <Typography color='gray' variant='caption' >Number: {i.numbers}</Typography>
                                                    <Typography color='gray' variant='caption' >Message: {sendBulk.data.sending_msg.length > 21 ? sendBulk.data.sending_msg.slice(0, 20).replace("{var_one}", i.var_one).replace("{var_two}", i.var_two) + "..." : sendBulk.data.sending_msg.replace("{var_one}", i.var_one).replace("{var_two}", i.var_two)}</Typography>
                                                    {sendBulk.data.with_media && <Typography color='gray' variant='caption' >Media: Attached</Typography>}
                                                </Stack>
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <DelayMsg />



            <Box mb={2} mt={2} >
                <Divider />
            </Box>

            <Stack direction={'column'} spacing={2}>

                <LoadingButton
                    size='small'
                    variant='contained'
                    onClick={sendExcel}
                    loading={state.loading}
                >
                    Scan QR and send
                </LoadingButton>

                <Button
                    onClick={() => sendBulk.setData({ ...sendBulk.data, step: 2 })}
                    variant='outlined'
                    size='small'>Back</Button>

            </Stack>
        </div>
    )
}

export default SendExceleMsg