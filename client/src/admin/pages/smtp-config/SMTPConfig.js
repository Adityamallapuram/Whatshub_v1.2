import { Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Divider, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import GetWebSet from '../../../utils/GetWebSet'


const SMTPConfig = () => {
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")
    const [smtp, setSmtp] = React.useState("")
    const { web_set } = GetWebSet()

    React.useEffect(() => {
        setSmtp(web_set)
    }, [web_set])

    function updateSet() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/web/update_smtp`, {
            smtp_host: smtp.smtp_host,
            smtp_port: smtp.smtp_port,
            smtp_email: smtp.smtp_email,
            smtp_password: smtp.smtp_password
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            alert(res.data.msg)
            setState({ ...state, loading: false })
            if (!res.data.success) {
                console.log(res.data)
            }
        }).catch((err) => console.log(err))
    }

    function testSet() {
        setState({ ...state, loading: true })
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/check_smtp`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            alert(res.data.msg)
            setState({ ...state, loading: false })
            console.log(res.data)
        }).catch((err) => console.log(err))
    }

    return (
        <Box p={2}>
            <Box>
                <Stack justifyContent={'space-between'} alignItems='center' direction={'row'} spacing={2}>
                    <Typography fontWeight={'bold'} >SMTP Settings</Typography>
                </Stack>
            </Box>
            <Box mt={2} mb={2}>
                <Divider />
            </Box>

            <Stack direction='column' spacing={2}>
                {
                    smtp ? (
                        <>
                            <Box bgcolor='orange' p={2} borderRadius={2}>
                                <Typography color='black' >Without this setting your forget password option won't work.</Typography>
                            </Box>
                            <TextField value={smtp.smtp_host} onChange={(e) => setSmtp({ ...smtp, smtp_host: e.target.value })} label="SMTP Host" size='small' fullWidth />
                            <TextField value={smtp.smtp_port} onChange={(e) => setSmtp({ ...smtp, smtp_port: e.target.value })} label="SMTP Port" size='small' fullWidth />
                            <TextField value={smtp.smtp_email} onChange={(e) => setSmtp({ ...smtp, smtp_email: e.target.value })} label="Email" size='small' fullWidth />
                            <TextField value={smtp.smtp_password} onChange={(e) => setSmtp({ ...smtp, smtp_password: e.target.value })} label="SMTP Password" size='small' fullWidth />
                            <LoadingButton disabled={smtp.smtp_host && smtp.smtp_port && smtp.smtp_email && smtp.smtp_password ? false : true} loading={state.loading} onClick={updateSet} variant='contained' fullWidth >Save</LoadingButton>
                            {/* <LoadingButton onClick={testSet} loading={state.loading} endIcon={<Refresh />} sx={{ textTransform: 'none' }} variant='outlined' fullWidth >Test Config</LoadingButton> */}
                        </>
                    ) : <LinearProgress />
                }
            </Stack>

        </Box>
    )
}

export default SMTPConfig