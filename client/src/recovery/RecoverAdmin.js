import { LoadingButton } from '@mui/lab'
import { Grid, Box, TextField, CardMedia, Snackbar, SnackbarContent, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router-dom'
import GetWebSet from '../utils/GetWebSet'


const RecoveryAdmin = (props) => {
    const { web_set } = GetWebSet()
    const [state, setState] = React.useState({
        password: ""
    })
    const history = useHistory()

    function modifyAdmin() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/modify_admin`, {
            email: state.email,
            password: state.password
        }, {
            headers: {
                Authorization: "Bearer " + props.match.params.id
            }
        }).then((res) => {
            console.log(res.data)
            if (!res.data.success) {
                return setState({ ...state, snack: true, snack_msg: "Ops. it seems your recovery link has been expired, Please send email again.", loading: false, snack_clr: "red" })
            }
            setState({ ...state, snack: true, snack_msg: "User has been updated you are now redirecting to the login page...", loading: false, snack_clr: 'green' })
            setTimeout(() => {
                history.push('/admin/login')
            }, 3000);
        }).catch((err) => console.log(err))
    }

    return (
        <Box minHeight={'100vh'} bgcolor='black' >
            <Snackbar open={state.snack} onClose={() => setState({ ...state, snack: false })} >
                <SnackbarContent sx={{ backgroundColor: state.snack_clr }} message={state.snack_msg} autoHideDuration={5000} />
            </Snackbar>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item >
                    <Box minWidth={'50vh'}>
                        <Grid container spacing={2} direction='column' >
                            <Grid item>
                                {
                                    web_set && (
                                        <CardMedia component={'img'} sx={{ height: 100, width: 100, borderRadius: 2 }} image={`/images/${web_set.logo}`} />
                                    )
                                }
                            </Grid>
                            <Grid item>
                                <Typography color='white' >Congo Admin! Here you can add your new password.</Typography>
                            </Grid>
                            {/* <Grid item>
                                <TextField onChange={(e) => setState({ ...state, email: e.target.value })} label="New Email" helperText={'optional'} fullWidth />
                            </Grid> */}
                            <Grid item>
                                <TextField size='small' onChange={(e) => setState({ ...state, password: e.target.value })} label="New Password" helperText={'required'} fullWidth />
                            </Grid>
                            <Grid item>
                                <LoadingButton disabled={state.password.length < 8 ? true : false} loading={state.loading} onClick={modifyAdmin} size='large' variant='contained' fullWidth >Go</LoadingButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

            </Grid>
        </Box>
    )
}

export default RecoveryAdmin