import React from 'react'
import { Box, Button, Dialog, Divider, IconButton, LinearProgress, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import DialogHeader from '../../../common/DialogHeader'
import { Close, Delete } from '@mui/icons-material'
import AddPlan from './AddPlan'
import { GlobalContext } from '../../../context/GlobalContext'
import GetPlans from '../../../utils/GetPlans'
import axios from 'axios'
import GetTokenAdmin from '../../../utils/GetTokenAdmin'

const ManagePlans = () => {
    const [state, setState] = React.useState({
        dialog: false
    })
    const globalContext = React.useContext(GlobalContext)
    const { plan_data } = GetPlans()
    const { token_admin } = GetTokenAdmin()

    async function deletePlan(e) {
        if (window.confirm("Are you sure?")) {
            setState({ ...state, loading: true })
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/plan/delete`, {
                id: e.id
            }, {
                headers: {
                    Authorization: "Bearer " + token_admin
                }
            })
            alert(res.data.msg)
            if (!res.data.success) {
                console.log(res.data)
                return
            }
            removeArr(e)
        }

    }

    function removeArr(e) {
        const update = globalContext.data.plan_data.filter(i => i !== e)
        globalContext.setData({ ...globalContext.data, plan_data: update })
    }

    return (
        <Box p={2} >
            <Stack alignItems={'center'} direction={'row'} justifyContent='space-between'>
                <Typography fontWeight={'bold'} >Manage Plans</Typography>
                <Button onClick={() => setState({ ...state, dialog: true })} size='small'>add new</Button>
            </Stack>
            <Box mt={2} mb={2}>
                <Divider />
            </Box>
            <Dialog open={state.dialog} onClose={() => setState({ ...state, dialog: false })} fullScreen>
                <DialogHeader
                    closebtn={
                        <IconButton onClick={() => setState({ ...state, dialog: false })} >
                            <Close />
                        </IconButton>}
                />
                <AddPlan />
            </Dialog>

            <Stack direction={'column'} spacing={2}>
                {
                    globalContext.data.plan_data ? globalContext.data.plan_data.map((i, key) => {
                        return (
                            <Box borderRadius={2} bgcolor='#131313' p={2}>
                                <Stack direction={'row'} justifyContent='space-between'>
                                    <Stack direction={'column'}>
                                        <Typography>{i.name}</Typography>
                                        <Typography variant='caption' color='gray'>Message Limit: {i.message_limit}</Typography>
                                        <Typography variant='caption' color='gray'>Cost: {i.cost}</Typography>
                                    </Stack>
                                    <IconButton onClick={() => {
                                        deletePlan(i)
                                    }} color='error' >
                                        <Delete />
                                    </IconButton>
                                </Stack>
                            </Box>
                        )
                    }) : <LinearProgress />
                }
            </Stack>

        </Box>
    )
}

export default ManagePlans