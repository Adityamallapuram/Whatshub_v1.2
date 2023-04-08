import { AccountBalance } from '@mui/icons-material'
import { Box, Grid, Typography, Button, CircularProgress, Dialog } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React from 'react'
import GetWebSet from '../../../utils/GetWebSet'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const DialogPlan = ({ plan, web_set }) => {
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")
    const history = useHistory()

    const [orderDone, setOrderDone] = React.useState(false)

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src

            script.onload = () => {
                resolve(true)
            }

            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const payByRz = async (amt) => {
        const resp = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        console.log(resp)
        if (!resp) {
            alert('Internet problem!')
            return
        }
        const finalamt = parseInt(plan.cost) / parseInt(web_set.exchange_rate) * 80

        const options = {
            key: web_set.rz_id,
            currency: "INR",
            amount: Math.round(finalamt) * 100,
            name: web_set.app_name,
            description: "100% secured payment",

            handler: function (response) {
                setState({ ...state, loading: true })
                axios.post(`${process.env.REACT_APP_BASE_URL}/api/order/pay_with_rz`, {
                    plan: plan,
                    rz_payment_id: response.razorpay_payment_id,
                    amount: plan.cost
                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then((res) => {
                    if (res.data.success) {
                        alert("Congo!")
                        history.push("/done-page")
                        setState({ ...state, loading: false })
                        return
                    }
                    console.log(res.data)
                    alert(res.data.msg)
                })
                    .catch((err) => console.log(err))
            }

        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()

    }

    function paywithPaypal(order_id) {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/order/paypal_with_paypal`, {
            order_id: order_id,
            plan: plan,
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            if (res.data.success) {
                alert("Congo!")
                history.push("/done-page")
                setState({ ...state, loading: false })
                return
            }
            console.log(res.data)
            alert(res.data.msg)
        }).catch((err) => {
            setState({ ...state, loading: false })
            console.log(err)
        })
    }


    return (
        <Box mt={2} >


            <Dialog open={state.offline_dialog} onClose={() => setState({ ...state, offline_dialog: false })}>
                <Box bgcolor="white" borderColor={'white'} p={6}>
                    <Stack direction='column' spacing={2} alignItems='center' >
                        <Typography color='black' fontWeight={'bold'} variant='h5' >Offline Instructions</Typography>
                        <Typography color='black'>{web_set && web_set.offline_msg}</Typography>
                    </Stack>
                </Box>
            </Dialog>


            <Container maxWidth='lg'>
                <Grid container minHeight={'80vh'} alignItems='center' justifyContent={'center'}>
                    {
                        web_set ? (
                            <Grid item>
                                <Stack alignItems={'center'} direction={'column'} spacing={2}>

                                    <Typography variant='h5' color='white' >Paying {plan?.cost} {web_set?.currency_symbol}</Typography>

                                    <Typography>Choose your payment method to checkout securly to opt <a style={{ color: '#FFD700', fontWeight: 'bold' }} >{plan.name}</a> Plan</Typography>

                                    <Stack alignItems={'flex-start'} direction={'row'} spacing={2}>
                                        {
                                            web_set.rz_is_is_active ?
                                                <Box onClick={payByRz} style={{ cursor: 'pointer' }} bgcolor={'white'} borderRadius={1} p={1.5}>
                                                    <Stack direction={'row'} spacing={2}>
                                                        <img src="/static/rzp-glyph-positive.png" style={{ height: 20 }} />
                                                        <Typography sx={{ textTransform: 'none' }} color='black' >Razorpay</Typography>
                                                    </Stack>
                                                </Box> : null
                                        }

                                        {
                                            web_set.paypal_is_active ?
                                                <PayPalScriptProvider options={{ "client-id": web_set.paypal_client_id }} >
                                                    <PayPalButtons
                                                        createOrder={(data, actions) => {
                                                            return actions.order.create({
                                                                purchase_units: [{
                                                                    description: plan.name,
                                                                    amount: {
                                                                        value: parseInt(plan.cost) / parseInt(web_set.exchange_rate)
                                                                    }
                                                                }]
                                                            })
                                                        }}
                                                        onApprove={async (data, actions) => {
                                                            const order = await actions.order.capture()
                                                            paywithPaypal(order.id)
                                                        }}
                                                        onError={(err) => {
                                                            console.log("err: ", err)
                                                        }}
                                                        onCancel={(cancel) => {
                                                            alert('Ops.. Your order was canceled.\nPlease contact support if you are feeling trouble.')
                                                        }}
                                                        onClick={(data, actions) => {

                                                        }}
                                                        style={{
                                                            color: 'white',
                                                            layout: 'horizontal',
                                                            height: 48,
                                                            tagline: false,
                                                        }} />
                                                </PayPalScriptProvider> : null
                                        }

                                        {
                                            web_set.offline_is_active ?
                                                <Box style={{ cursor: 'pointer' }} onClick={() => setState({ ...state, offline_dialog: true })} bgcolor={'white'} borderRadius={1} p={1.5}>
                                                    <Stack direction={'row'} spacing={2}>
                                                        <AccountBalance sx={{ color: 'gray' }} />
                                                        <Typography sx={{ textTransform: 'none' }} color='black' >Offline Payment</Typography>
                                                    </Stack>
                                                </Box> : null
                                        }
                                    </Stack>

                                </Stack>
                            </Grid>
                        ) : <CircularProgress />
                    }
                </Grid>
            </Container>
        </Box>
    )
}

export default DialogPlan