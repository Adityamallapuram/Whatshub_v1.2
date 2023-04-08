import { Accordion, Button, AccordionDetails, AccordionSummary, Switch, TextField, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import axios from 'axios'
import { AdminContext } from '../../../../context/AdminContext'
import { ExpandMore, Refresh, SmartToy } from '@mui/icons-material'
import GetPlans from '../../../../utils/GetPlans'

const EditUser = ({ user }) => {
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")
    const adminContext = React.useContext(AdminContext)
    const { plan_data } = GetPlans()
    const [bot, setBot] = React.useState("")
    const [deleted, setDeleted] = React.useState(false)

    React.useEffect(() => {
        if (!token || !user) {
            return
        }
        getBot()
        setState({ ...user })
    }, [user, token])

    function getUsers() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/get_all_user`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            adminContext.setData({ ...adminContext.data, all_users: res.data.data })
            setState({ ...state, loading: false })
        })
            .catch((err) => console.log(err))
    }

    function updateUser() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/admin_user_update`, state, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            getUsers()
            alert(res.data.msg)
        }).catch((err) => console.log(err))
    }

    function updatePlan() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/admin_plan_update`, {
            plan: state.plan,
            uid: user.uid
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            alert(res.data.msg)
            setState({ ...state, loading: false })
        }).catch((err) => console.log(err))
    }

    function getBot() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/get_bot_from_admin`, {
            uid: user.uid
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            setBot(res.data.data)
        }).catch((err) => console.log(err))
    }

    function killBot() {
        if (window.confirm("Make sure bot session is logged out from WhstsApp mobile App.\nElse close this bot by logging out the bot session from WhstApp App")) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/kill_bot_by_admin`, {
                uid: user.uid
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                alert(res.data.msg)
                if (res.data.success) {
                    setBot("")
                }
            }).catch((err) => console.log(err))
        }
    }

    function deleteUser(e) {
        if (window.confirm("Are your sure")) {
            setState({ ...state, loading: true })
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/delete_user`, {
                uid: e
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                if (res.data.success) {
                    setDeleted(true)
                }
                alert(res.data.msg)
                setState({ ...state, loading: false })
                getUsers()
            }).catch((err) => console.log(err))
        }
    }

    return (
        <Box minHeight={'100vh'} bgcolor={'black'}>
            <Container maxWidth='lg'>
                <Box mt={2}>
                    {
                        deleted ? (
                            <Typography>This user has been deleted</Typography>
                        ) : (
                            <Stack direction={'column'} spacing={2}>
                                <TextField onChange={(e) => setState({ ...state, name: e.target.value })} size='small' value={state.name} label="Name" fullWidth />
                                <TextField onChange={(e) => setState({ ...state, email: e.target.value })} size='small' value={state.email} label="Email" fullWidth />
                                <TextField onChange={(e) => setState({ ...state, mobile: e.target.value })} size='small' value={state.mobile} label="Mobile" fullWidth />
                                <TextField onChange={(e) => setState({ ...state, new_password: e.target.value })} helperText="Leave it blank password you don't want to change it" size='small' label="Password" fullWidth />
                                <Stack alignItems={'center'} direction={'row'} justifyContent='space-between'>
                                    <LoadingButton loading={state.loading} onClick={() => deleteUser(user.uid)} fullWidth variant='outlined' color='error'>
                                        Delete User
                                    </LoadingButton>
                                </Stack>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />} >
                                        <Typography>Update Plan</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack alignItems={'center'} direction={'row'} spacing={2}>
                                            {
                                                plan_data && plan_data.map((i, key) => {
                                                    return (
                                                        <Box onClick={() => {
                                                            setState({ ...state, plan: JSON.stringify(i) })
                                                        }} sx={{ textTransform: 'none' }} component={Button} key={key} border={1}
                                                            borderColor={
                                                                state.plan && JSON.parse(state.plan).id === i.id ? "orange" : "white"
                                                            }
                                                            bgcolor={'#262626'} p={2} borderRadius={2}>
                                                            <Stack direction={'column'} spacing={1}>
                                                                <Typography align='center' color={state.plan && JSON.parse(state.plan).id === i.id ? "orange" : "white"} variant='body2' fontWeight='bold'>
                                                                    {i.name}
                                                                </Typography>
                                                                <Typography align='center' color={'gray'} variant='body2' >
                                                                    {i.message_limit} msgs.
                                                                </Typography>
                                                                <Typography align='center' color={'gray'} fontSize={12} >
                                                                    {i.cost} msgs.
                                                                </Typography>
                                                            </Stack>
                                                        </Box>
                                                    )
                                                })
                                            }
                                        </Stack>

                                        <Stack alignItems={'center'} direction='row' justifyContent={'space-between'} mt={2}>
                                            <Typography variant='body2' color='gray' >{state.left_msg > 0 ? state.left_msg + " msg left" : null}</Typography>
                                            <LoadingButton loading={state.loading} onClick={updatePlan} startIcon={<Refresh />} variant='outlined' >Update Plan</LoadingButton>
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>

                                {
                                    bot &&
                                    <Box border={1} bgcolor={'#161616'} p={2} borderRadius={2} >
                                        <Stack alignItems={'center'} direction={'row'} justifyContent='space-between'>
                                            <Typography color='white' >WhatsApp Bot is running...</Typography>
                                            <Button startIcon={<SmartToy />} onClick={killBot} size='small' color='error' variant='outlined'  >Kill Bot</Button>
                                        </Stack>
                                    </Box>
                                }

                                <LoadingButton onClick={updateUser} loading={state.loading} variant='contained' >Update</LoadingButton>
                            </Stack>
                        )
                    }
                </Box>
            </Container >
        </Box>
    )
}

export default EditUser