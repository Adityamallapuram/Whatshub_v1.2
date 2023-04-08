import React from 'react'
import { Box, Button, Chip, IconButton, InputAdornment, LinearProgress, Switch, Stack, Typography } from '@mui/material'
import { SendBulkContext } from '../../../../context/SendBulkContext'
import axios from 'axios'
import { AddPhotoAlternate, AttachFile, Warning } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

const AddMediaComp = (props) => {
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
                setState({ ...state, media_url: window.location.protocol + '//' + window.location.host + "/user-media/" + res.data.filename })
                props.onComplete({ media_url: window.location.protocol + '//' + window.location.host + "/user-media/" + res.data.filename });
                // sendBulk.setData({ ...state, media_url: window.location.protocol + '//' + window.location.host + "/user-media/" + res.data.filename })
            }
        })
    }


    return (
        <div>

            <Box borderRadius={2} bgcolor='#262626' p={1} mt={2} mb={2}>
                <Stack justifyContent={'space-between'} direction={'row'} alignItems='center' >
                    <Typography variant='caption'>With Media ?</Typography>
                    <Switch

                        onChange={(e) => setState({ ...state, with_media: !state.with_media })}
                        checked={state.with_media} />
                </Stack>

                {
                    state.with_media &&
                    <Box mt={2} >
                        <form key={1} encType='formdata/multi-part' onSubmit={uploadMedia} >
                            {
                                <Stack mb={2} direction={'row'}>

                                    {
                                        state.file || state.media_url ? (
                                            state.media_url ? (
                                                <Chip color='success' label={state.media_url} />
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
                                state.file && !state.media_url &&
                                <LoadingButton
                                    loading={state.loading}
                                    fullWidth
                                    disabled={state.media_url ? true : false}
                                    color={state.media_url ? 'success' : 'secondary'}
                                    size='small'
                                    variant='contained' type="submit" >
                                    {state.media_url ? "Done" : "Upload Media"}
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