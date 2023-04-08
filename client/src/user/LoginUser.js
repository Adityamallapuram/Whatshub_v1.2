import { Button, CircularProgress, Dialog, Grid, LinearProgress, Fade, Stack, TextField, Typography, Zoom, IconButton } from '@mui/material'
import { Box, Container } from '@mui/system'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import GetWebSet from '../utils/GetWebSet'
import { Close } from '@mui/icons-material'

const LoginUser = () => {
    const [state, setState] = React.useState({})
    const history = useHistory()
    const { web_set } = GetWebSet()


    function tryLogin() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, {
            email: state.email,
            password: state.password
        }).then((res) => {
            setState({ ...state, loading: false })
            if (res.data.success) {
                localStorage.setItem(process.env.REACT_APP_TOKEN + "_user", res.data.token)
                history.push('/user')
                return
            }
            alert(res.data.msg)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
            setState({ ...state, loading: false })
        })
    }

    function trySignup() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/signup_user`, {
            name: state.signup_name,
            email: state.signup_email,
            password: state.signup_password,
            mobile: state.signup_mobile
        }).then((res) => {
            alert(res.data.msg)
            setState({ ...state, loading: false })
            if (res.data.success) {
                setState({ ...state, loading: false, is_signup: false })
            }
        }).catch((err) => console.log(err))
    }

    function tryRecovery() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/send_recovery_link_user`, {
            email: state.recovery_email
        }).then((res) => {
            alert(res.data.msg)
            setState({ ...state, loading: false, dialog: false })
        }).catch((err) => console.log(err))
    }

    return (
        <Grid container direction={'column'} minHeight={'100vh'} alignItems='center' justifyContent={'center'} bgcolor='black'>
            <Grid item>

                <Dialog open={state.dialog} onClose={() => {
                    setState({ ...state, dialog: false })
                }} fullScreen >
                    <Box minHeight={'100vh'} bgcolor={'black'} p={2}>
                        <IconButton onClick={() => setState({ ...state, dialog: false })} >
                            <Close />
                        </IconButton>
                        <Grid container minHeight={'80vh'} alignItems='center' justifyContent={'center'}>
                            <Grid minWidth={400} item>
                                <Stack alignItems={'flex-start'} direction={'column'} spacing={2} >
                                    <TextField onChange={(e) => setState({ ...state, recovery_email: e.target.value })} size='small' label="Enter your email" fullWidth />
                                    <LoadingButton onClick={tryRecovery} disabled={state.recovery_email ? false : true} loading={state.loading} >Send a recover link</LoadingButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Dialog>


                {
                    web_set ? (
                        <Container maxWidth='lg'>
                            <Box minWidth={400} p={4} borderRadius={4} bgcolor='#212121'>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Stack mb={2} alignItems={'center'}>
                                            <img style={{ borderRadius: 10 }} src={`/images/${web_set.logo}`} height="100%" width="100" />
                                        </Stack>
                                    </Grid>
                                    {
                                        state.is_signup ? (
                                            <Fade in={true} >
                                                <Box p={2}>
                                                    <Stack direction={'column'} spacing={2}>
                                                        <TextField size='small'
                                                            onChange={(e) => setState({ ...state, signup_name: e.target.value })}
                                                            label="Your Name" fullWidth />
                                                        <TextField size='small'
                                                            onChange={(e) => setState({ ...state, signup_email: e.target.value })}
                                                            label="Your Email" fullWidth />
                                                        <TextField type="number" size='small'
                                                            onChange={(e) => setState({ ...state, signup_mobile: e.target.value })}
                                                            helperText="Entery your mobile along with your country code" label="Your Mobile" fullWidth />
                                                        <TextField size='small'
                                                            onChange={(e) => setState({ ...state, signup_password: e.target.value })}
                                                            label="Your Password" fullWidth />

                                                        <LoadingButton loading={state.loading} onClick={trySignup} variant='contained' fullWidth >Go!</LoadingButton>
                                                        <Button onClick={() => {
                                                            setState({ ...state, is_signup: false })
                                                        }} size='small' >Login</Button>
                                                    </Stack>
                                                </Box>
                                            </Fade>
                                        ) : (
                                            <Zoom in={true} >
                                                <Box p={2}>
                                                    <Stack direction={'column'} spacing={2}>
                                                        <TextField size='small' onChange={(e) => setState({ ...state, email: e.target.value })} label="Email" fullWidth />

                                                        <TextField size='small' onChange={(e) => setState({ ...state, password: e.target.value })} label="Password" type='password' fullWidth />

                                                        <Stack alignItems={'flex-end'}>
                                                            <a onClick={() => {
                                                                setState({ ...state, dialog: true })
                                                            }} style={{ cursor: 'pointer' }} >
                                                                <Typography variant='caption' color='gray' >Forget password?</Typography>
                                                            </a>
                                                        </Stack>

                                                        <LoadingButton loading={state.loading} onClick={tryLogin} disabled={state.email && state.password ? false : true} fullWidth contained color='inherit' variant='contained' sx={{ borderRadius: 10 }} >Try</LoadingButton>

                                                        <Button onClick={() => setState({ ...state, is_signup: true })} size='small' >Signup</Button>

                                                        <a style={{ cursor: 'pointer' }} onClick={() => {
                                                            window.open("https://codeyon.com")
                                                        }} >
                                                            <Typography fontSize={12} align='center' color='gray' >Developed by Codeyon.com</Typography>
                                                        </a>
                                                    </Stack>
                                                </Box>
                                            </Zoom>
                                        )
                                    }
                                </Grid>
                            </Box>
                        </Container>
                    ) : <CircularProgress />
                }
            </Grid>
        </Grid>
    )
}

export default LoginUser