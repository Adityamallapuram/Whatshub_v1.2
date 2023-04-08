import { Dialog, Grid, IconButton, TextField, Typography, Stack } from '@mui/material'
import { Box, Container } from '@mui/system'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Close } from '@mui/icons-material'

const LoginAdmin = () => {
    const [state, setState] = React.useState({})
    const history = useHistory()

    function tryLogin() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/login`, {
            email: state.email,
            password: state.password
        }).then((res) => {
            setState({ ...state, loading: false })
            if (res.data.success) {
                localStorage.setItem(process.env.REACT_APP_TOKEN + "_admin", res.data.token)
                history.push('/admin')
                return
            }
            alert(res.data.msg)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
            setState({ ...state, loading: false })
        })
    }


    function tryRecovery() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/send_recovery_link_admin`, {
            email: state.recovery_email
        }).then((res) => {
            alert(res.data.msg)
            setState({ ...state, loading: false, dialog: false })
        }).catch((err) => console.log(err))
    }

    return (
        <Grid container direction={'column'} height={'100vh'} alignItems='center' justifyContent={'center'} bgcolor='black'>
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

                <Container maxWidth='lg'>
                    <Box p={4} borderRadius={4} bgcolor='#212121'>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Typography sx={{ padding: 5 }} color='white' align='center' variant='h2' >Admin Panel</Typography>
                            </Grid>
                            <Grid item>
                                <TextField onChange={(e) => setState({ ...state, email: e.target.value })} label="Email" fullWidth />
                            </Grid>
                            <Grid item>
                                <TextField onChange={(e) => setState({ ...state, password: e.target.value })} label="Password" type='password' fullWidth />
                            </Grid>
                            <Grid item>
                                <a onClick={() => {
                                    setState({ ...state, dialog: true })
                                }} style={{ cursor: 'pointer' }} >
                                    <Typography variant='caption' color='gray' >Forget password?</Typography>
                                </a>
                            </Grid>
                            <Grid item>
                                <LoadingButton loading={state.loading} onClick={tryLogin} disabled={state.email && state.password ? false : true} fullWidth contained color='inherit' variant='contained' sx={{ borderRadius: 10 }} >Try</LoadingButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    )
}

export default LoginAdmin