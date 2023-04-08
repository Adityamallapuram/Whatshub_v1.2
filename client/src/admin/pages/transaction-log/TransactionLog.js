import { ChevronRight, ExpandMore, FileDownload } from '@mui/icons-material'
import { LoadingButton, TreeItem, TreeView } from '@mui/lab'
import { Box, Divider, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, LinearProgress } from '@mui/material'
import axios from 'axios'
import React from 'react'
import moment from 'moment'

const TransactionLog = () => {
    const [order, setOrder] = React.useState("")
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")

    function getOrder() {
        setState({ ...state, loading: true })
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/order/get_all_orders_admin`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setOrder(res.data.data)
            setState({ ...state, loading: false })
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if (!token) {
            return
        }
        getOrder()
    }, [token])


    function clearAll(e) {
        if (window.confirm(`Are your sure you want to delete all logs ?`)) {
            setState({ ...state, loading: true })
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/order/clear_all_log`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                setState({ ...state, loading: false })
                if (!res.data.success) {
                    console.log(res.data)
                }
                alert(res.data.msg)
                getOrder()
            }).catch((err) => {
                console.log(err)
                setState({ ...state, loading: false })
            })
        }
    }

    return (
        <Box p={2} >
            <Box>
                <Stack justifyContent={'space-between'} alignItems='center' direction={'row'} spacing={2}>
                    <Typography fontWeight={'bold'} >Transaction Log(s)</Typography>
                    <Stack direction={'row'} spacing={1}>
                        <LoadingButton loading={state.loading} onClick={clearAll} color='error' variant='contained' sx={{ textTransform: 'none' }} >Clear All</LoadingButton>
                    </Stack>
                </Stack>
            </Box>
            <Box mt={2} mb={2}>
                <Divider />
            </Box>

            <Stack direction={'column'} spacing={2}>
                {
                    order ? (
                        [...order].reverse().map((item, key) => {
                            return (
                                <Accordion key={key} >
                                    <AccordionSummary
                                        sx={{ backgroundColor: '#1D5469', borderRadius: 2 }}
                                        expandIcon={<ExpandMore />}
                                    >
                                        <Typography>{item.order_type}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack direction={'column'} spacing={0.5} >
                                            <Typography color='gray' variant='caption'>
                                                Buyer Email: {item.user_data.email}
                                            </Typography>
                                            <Typography color='gray' variant='caption'>
                                                Payment ID: {item.transaction.id}
                                            </Typography>
                                            <Typography color='gray' variant='caption'>
                                                Status: {item.transaction.status}
                                            </Typography>
                                            {
                                                item.order_type === "Razorpay" && (
                                                    <Typography color='gray' variant='caption'>
                                                        Amount: {item.transaction.amount} {item.transaction.currency}
                                                    </Typography>
                                                )
                                            }
                                            {
                                                item.order_type === "Paypal" && (
                                                    <Typography color='gray' variant='caption'>
                                                        Amount: {item.transaction.gross_total_amount.value} {item.transaction.gross_total_amount.currency}
                                                    </Typography>
                                                )
                                            }
                                            <Typography color='gray' variant='caption'>
                                                Caprure Date & Time: {moment(item.createdAt).format('DD-MMMM-YYYY / h:mm:ss a')}
                                            </Typography>
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    ) : <LinearProgress />
                }
            </Stack>

        </Box>
    )
}

export default TransactionLog