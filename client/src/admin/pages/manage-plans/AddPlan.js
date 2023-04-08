import { Box, Container, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import React from 'react'
import GetTokenAdmin from '../../../utils/GetTokenAdmin'
import { GlobalContext } from '../../../context/GlobalContext'

const AddPlan = () => {
    const [state, setState] = React.useState({})
    const { token_admin } = GetTokenAdmin()
    const globalContext = React.useContext(GlobalContext)

    async function fetchPlans() {
        setState({ ...state, loading: true })
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/plan/get`)
        globalContext.setData({ ...globalContext.data, plan_data: res.data.data })
        if (!res.data.success) {
            console.log(res.data)
        }
        setState({ ...state, loading: false, cost: "", message_limit: "", name: "" })
    }

    async function addPlan() {
        setState({ ...state, loading: true })
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/plan/add`, {
            name: state.name,
            message_limit: state.message_limit,
            cost: state.cost
        }, {
            headers: {
                Authorization: "Bearer " + token_admin
            }
        })
        if (!res.data.success) {
            console.log(res.data)
        }
        setState({ ...state, loading: false })
        alert(res.data.msg)
        fetchPlans()
    }

    return (
        <Container maxWidth='lg'>
            <Box mt={2}>
                <Box mb={4}>
                    <Typography align='center' fontWeight={'bold'} >Add a plan</Typography>
                </Box>
                <Stack direction={'column'} spacing={2}>
                    <TextField value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} fullWidth label="Plan Name" size='small' />
                    <TextField value={state.message_limit} type="number" onChange={(e) => setState({ ...state, message_limit: parseInt(e.target.value) })} fullWidth label="Message Limit" size='small' />
                    <TextField value={state.cost} type="number" onChange={(e) => setState({ ...state, cost: parseInt(e.target.value) })} fullWidth label="Cost" size='small' />
                    <LoadingButton onClick={addPlan} loading={state.loading} variant='contained' >Add new</LoadingButton>
                </Stack>
            </Box>
        </Container>
    )
}

export default AddPlan