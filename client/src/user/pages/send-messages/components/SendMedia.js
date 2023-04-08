import { Send } from '@mui/icons-material'
import { Box, FormControl, InputLabel, LinearProgress, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import GetInstance from '../../../../utils/GetInstance'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import AddMediaComp from './AddMediaComp'

const SendMedia = () => {
    const { instance } = GetInstance()
    const [state, setState] = React.useState({
        unique_id: Date.now()
    })
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")

    function senMsg() {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/instance/send_text`, state, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            setState({ ...state, loading: false })
            alert(res.data.msg)
        }).catch((err) => console.log(err))
    }

    return (
        <Box borderRadius={2} p={2} m={2}>
            <Stack direction={'column'} spacing={2}>
                <Typography variant='h6' fontWeight={'bold'} >Send Message With or Without Media</Typography>

                {instance ?
                    <Box mt={2}>
                        <Stack direction={'column'} spacing={2}>
                            <FormControl
                                size='small' fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Instance</InputLabel>
                                <Select
                                    sx={{ borderRadius: 3 }}
                                    size='small'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={Select Instance}
                                    label="Select Instance"
                                    onChange={(e) => setState({ ...state, client_id: e.target.value.client_id, sender: e.target.value.mobile })}
                                >
                                    {instance && instance.map((i, key) => {
                                        return (
                                            <MenuItem key={key} value={i}>+{i.mobile}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Stack>
                    </Box> : <LinearProgress />}

                {/* <TextField
                    onChange={(e) => setState({ ...state, media: e.target.value })}
                    value={state.media}
                    helperText='keep this field empty if you dont want to send media'
                    label="Enter media URL"
                    size='small'
                    variant="outlined"
                    placeholder='http://'
                    InputProps={{
                        style: {
                            borderRadius: 14
                        },
                    }}
                /> */}

                <AddMediaComp
                    onComplete={(e) => setState({ ...state, media: e.media_url })}
                />

                {/* {JSON.stringify(state)}  */}

                <TextField
                    onChange={(e) => setState({ ...state, receiver: e.target.value })}
                    value={state.receiver}
                    label="Enter contact number"
                    type='number'
                    size='small'
                    placeholder='918888888880'
                    variant="outlined"
                    InputProps={{
                        style: {
                            borderRadius: 14
                        },
                    }}
                />

                <TextField
                    onChange={(e) => setState({ ...state, message: e.target.value })}
                    value={state.message}
                    label="Enter your message"
                    rows={4}
                    multiline={true}
                    size='small'
                    variant="outlined"
                    InputProps={{
                        style: {
                            borderRadius: 14
                        },
                    }}
                />


                <Stack alignItems={'flex-end'}>
                    <LoadingButton
                        onClick={senMsg}
                        loading={state.loading}
                        disabled={state.sender && state.receiver && state.message ? false : true}
                        startIcon={<Send />}
                        sx={{ borderRadius: 2 }} variant='contained' >Send Message</LoadingButton>
                </Stack>

            </Stack>
        </Box>
    )
}

export default SendMedia