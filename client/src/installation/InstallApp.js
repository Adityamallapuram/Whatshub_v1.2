import React from 'react'
import { Box, Button, Grid, IconButton, TextField, Typography, Zoom } from '@mui/material'
import { Container, Stack } from '@mui/system'
import { LoadingButton } from '@mui/lab'
import { ArrowRight } from '@mui/icons-material'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const InstallApp = () => {
    const [state, setState] = React.useState({
        step: 'one'
    })
    const history = useHistory()

    function installApp() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/web/install_app`, {
            app_name: state.app_name,
            currency_symbol: state.currency_symbol,
            exchange_rate: state.exchange_rate,
            admin_email: state.admin_email,
            admin_password: state.admin_password
        }).then((res) => {
            setState({ ...state, loading: false })
            alert(res.data.msg)
            if (res.data.success) {
                setTimeout(() => {
                    history.push('/admin/login')
                }, 2000);
            }
        }).catch((err) => console.log(err))
    }


    return (
        <Box p={2} minHeight='100vh' bgcolor={'black'} >
            <Container maxWidth='lg'>
                <Grid bgcolor={'black'} container minHeight={'100vh'} alignItems='center' justifyContent={'center'}>
                    {
                        state.step === 'one' &&
                        <Grid item>
                            <Zoom in={true} >
                                <Stack direction={'column'} spacing={2}>

                                    <Stack alignItems={'center'}>
                                        <Typography color='white' variant='h5' >Thanks for purchasing WhatsHam v1 by codeyon.com</Typography>
                                        <Typography color='gray' variant='caption' >Make sure you have setup your .env file</Typography>
                                    </Stack>

                                    <TextField value={state.app_name} onChange={(e) => setState({ ...state, app_name: e.target.value })}
                                        label="App Name" fullWidth size='small' />
                                    <TextField value={state.currency_symbol} onChange={(e) => setState({ ...state, currency_symbol: e.target.value })}
                                        label="Currency Symbol" fullWidth size='small' />
                                    <TextField type='number' value={state.exchange_rate} onChange={(e) => setState({ ...state, exchange_rate: e.target.value })}
                                        label="Exchange Rate" helperText="Enter your currency amount, 1 USD = ?" fullWidth size='small' />

                                    <Stack alignItems={'flex-end'}>
                                        <IconButton
                                            disabled={state.app_name && state.currency_symbol && state.exchange_rate ? false : true}
                                            onClick={() => setState({ ...state, step: 'two' })} >
                                            <ArrowRight sx={{ height: 100, width: 100 }} />
                                        </IconButton>
                                    </Stack>

                                </Stack>
                            </Zoom>
                        </Grid>
                    }
                    {
                        state.step === 'two' &&
                        <Grid xs={6} sm={6} lg={6} item>
                            <Zoom in={true} >
                                <Stack direction={'column'} spacing={2}>

                                    <Stack alignItems={'center'}>
                                        <Typography color='white' variant='h5' >Admin Setup</Typography>
                                    </Stack>

                                    <TextField value={state.admin_email} onChange={(e) => setState({ ...state, admin_email: e.target.value })}
                                        label="Admin Email" fullWidth size='small' />
                                    <TextField value={state.admin_password} onChange={(e) => setState({ ...state, admin_password: e.target.value })}
                                        label="Admin Password" fullWidth size='small' />

                                    <Button size='small' onClick={() => setState({ ...state, step: 'one' })} >Back</Button>

                                    <LoadingButton
                                        loading={state.loading}
                                        onClick={installApp}
                                        disabled={state.admin_email && state.admin_password ? false : true} fullWidth variant='contained'  >INstall</LoadingButton>
                                </Stack>
                            </Zoom>
                        </Grid>
                    }
                </Grid>
            </Container>
        </Box>
    )
}

export default InstallApp