import { Box, Typography, Divider, Stack, Switch, TextField, LinearProgress } from '@mui/material'
import React from 'react'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import GetWebSet from '../../../utils/GetWebSet'

const ManagePayGateway = () => {
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")
    const history = useHistory()
    const { web_set } = GetWebSet()

    React.useEffect(() => {
        setState({ ...web_set })
    }, [web_set])

    function updateWeb() {

        setState({ ...state, loading: true })

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/web/update`, {
            rz_is_is_active: state.rz_is_is_active,
            rz_key: state.rz_key,
            rz_id: state.rz_id,
            offline_is_active: state.offline_is_active,
            offline_msg: state.offline_msg,
            paypal_is_active: state.paypal_is_active,
            exchange_rate: state.exchange_rate,
            paypal_client_id: state.paypal_client_id,
            paypal_client_secret: state.paypal_client_secret
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            setState({ ...state, loading: false })
            if (res.data.logout) {
                localStorage.removeItem('webtorrent_admin')
                history.push('/admin')
            }
            alert(res.data.msg)
            setState({ ...state, loading: false })
            if (!res.data.success) {
                console.log(res.data)
            }
        }).catch((err) => {
            console.log(err)
            setState({ ...state, loading: true })
        })
    }



    return (
        <Box p={2}>
            {
                state.id ? (
                    <>
                        <Stack justifyContent={'space-between'} alignItems='center' direction={'row'} >
                            <Typography fontWeight={'bold'} >Payment Gateways</Typography>
                            <LoadingButton disabled={state.exchange_rate ? false : true} onClick={updateWeb} loading={state.loading} color='secondary' variant='contained' sx={{ textTransform: 'none' }} >Save</LoadingButton>
                        </Stack>
                        <Box mt={2} mb={2}>
                            <Divider />
                        </Box>

                        <TextField type='number' value={state.exchange_rate} onChange={(e) => setState({ ...state, exchange_rate: e.target.value })} helperText="(Please Enter The Exchange Rate For 1 USD = ?)" label='Exchange Rate *' fullWidth size="small" />

                        <Box mt={2} mb={2}>
                            <Divider />
                        </Box>

                        <Stack direction={'row'} spacing={2} justifyContent={'space-between'} alignItems='center'>
                            <Typography>Razorpay</Typography>
                            <Switch checked={state.rz_is_is_active} onChange={() => {
                                setState({ ...state, rz_is_is_active: state.rz_is_is_active == 0 ? 1 : 0 })
                            }} />
                        </Stack>
                        <Stack mt={2} direction={'column'} spacing={2}>
                            <TextField value={state.rz_key} onChange={(e) => setState({ ...state, rz_key: e.target.value })} label='Rz Keys' fullWidth size="small" />
                            <TextField value={state.rz_id} onChange={(e) => setState({ ...state, rz_id: e.target.value })} label='Rz ID' fullWidth size="small" />
                        </Stack>


                        <Box mt={4} mb={4}>
                            <Divider />
                        </Box>

                        <Stack direction={'row'} spacing={2} justifyContent={'space-between'} alignItems='center'>
                            <Typography>Paypal</Typography>
                            <Switch checked={state.paypal_is_active} onChange={() => {
                                setState({ ...state, paypal_is_active: state.paypal_is_active == 0 ? 1 : 0 })
                            }} />
                        </Stack>
                        <Stack mt={2} direction={'column'} spacing={2}>
                            <TextField value={state.paypal_client_id} onChange={(e) => setState({ ...state, paypal_client_id: e.target.value })} label='Paypal ClientID' fullWidth size="small" />
                            <TextField value={state.paypal_client_secret} onChange={(e) => setState({ ...state, paypal_client_secret: e.target.value })} label='Paypal Client Secret' fullWidth size="small" />
                        </Stack>

                        <Box mt={4} mb={4}>
                            <Divider />
                        </Box>

                        <Stack direction={'row'} spacing={2} justifyContent={'space-between'} alignItems='center'>
                            <Typography>Offline Payment</Typography>
                            <Switch checked={state.offline_is_active} onChange={() => setState({ ...state, offline_is_active: state.offline_is_active == 0 ? 1 : 0 })} />
                        </Stack>
                        <TextField value={state.offline_msg} onChange={(e) => setState({ ...state, offline_msg: e.target.value })} sx={{ mt: 2 }} label='This will appear to user' multiline rows={4} fullWidth size="small" />
                    </>
                ) : (
                    <LinearProgress />
                )
            }
        </Box>
    )
}

export default ManagePayGateway