import React from 'react'
import { Box, Button, Chip, IconButton, InputAdornment, LinearProgress, Switch, Stack, Typography } from '@mui/material'
import { SendBulkContext } from '../../../../context/SendBulkContext'
import axios from 'axios'
import { AddPhotoAlternate, AttachFile, Warning } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

const AddMediaComp = (props) => {
    const sendBulk = React.useContext(SendBulkContext)
    const [state, setState] = React.useState({})
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")
    const [uploadPer, setUploadPer] = React.useState(0)

    function uploadMedia(e) {
        setState({ ...state, loading: true })
        e.preventDefault()
        let fd = new FormData()
        fd.append('file', state.file)
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/add_media`, fd, {
            headers: {
                Authorization: "Bearer " + token
            },
            onUploadProgress: e => {
                setUploadPer(parseInt(Math.round((e.loaded * 100) / e.total)))
            }
        }).then((res) => {
            if (!res.data.success) {
                alert(res.data.msg)
            } else {
                setState({ ...state, loading: false })
                props.onComplete({ media_url: window.location.protocol + '//' + window.location.host + "/user-media/" + res.data.filename });
                // sendBulk.setData({ ...sendBulk.data, media_url: window.location.protocol + '//' + window.location.host + "/user-media/" + res.data.filename })
            }
        })
    }


    return (
        <div>

            <Box borderRadius={2} bgcolor='#262626' p={1} mt={2} mb={2}>
                <Stack justifyContent={'space-between'} direction={'row'} alignItems='center' >
                    <Typography variant='caption'>With Media ?</Typography>
                    <Switch
                        onChange={(e) => sendBulk.setData({ ...sendBulk.data, with_media: !sendBulk.data.with_media })}
                        checked={sendBulk.data.with_media} />
                </Stack>

                {
                    sendBulk.data.with_media &&
                    <Box mt={2} >
                        <form key={1} encType='formdata/multi-part' onSubmit={uploadMedia} >
                            {
                                <Stack mb={2} direction={'row'}>

                                    {
                                        state.file || sendBulk.data.media_url ? (
                                            sendBulk.data.media_url ? (
                                                <Chip color='success' label={sendBulk.data.media_url} />
                                            ) :
                                                <Chip color='secondary' onDelete={() => {
                                                    setState({ ...state, file: "" })
                                                    setUploadPer(0)
                                                }} label={state.file.name} />
                                        ) : (
                                            <Button startIcon={<AttachFile />} size='small' component="label">
                                                <input
                                                    // accept="image/png, image/jpeg, image/jpg"
                                                    type="file"
                                                    hidden
                                                    onChange={(e) => {
                                                        if (e.target.files[0].size > 15000000) {
                                                            return alert("Max accepted file is 15MB")
                                                        }
                                                        setState({ ...state, file: e.target.files[0] })
                                                    }}
                                                />
                                                Add Media
                                            </Button>
                                        )
                                    }
                                </Stack>
                            }

                            {uploadPer > 0 && <LinearProgress color={uploadPer === 100 ? 'success' : 'primary'} sx={{ mb: 2 }} variant="buffer" value={uploadPer} valueBuffer={uploadPer + 10} />}

                            {
                                state.file && !sendBulk.data.media_url &&
                                <LoadingButton
                                    loading={state.loading}
                                    fullWidth
                                    color='secondary'
                                    size='small'
                                    disabled={sendBulk.data.sending_msg ? false : true}
                                    variant='contained' type="submit" >
                                    Upload Media
                                </LoadingButton>
                            }


                        </form>
                    </Box>
                }
            </Box>
        </div>
    )
}

export default AddMediaComp