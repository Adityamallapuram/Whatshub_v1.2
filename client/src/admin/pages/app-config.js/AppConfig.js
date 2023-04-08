import { AddPhotoAlternate } from '@mui/icons-material'
import { Button, Divider, LinearProgress, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import GetWebSet from '../../../utils/GetWebSet'
import { SketchPicker } from 'react-color'
import { LoadingButton } from '@mui/lab'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const AppConfig = () => {
    const { web_set } = GetWebSet()
    const [state, setState] = React.useState({})
    const [web, setWeb] = React.useState("")
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")
    const history = useHistory()

    React.useEffect(() => {
        setWeb({ ...web_set })
    }, [web_set])


    function updateWeb(e) {
        e.preventDefault()
        const fd = new FormData()
        setState({ ...state, loading: true })
        fd.append('app_name', web.app_name)
        fd.append('file', state.logo_image)
        fd.append('currency_symbol', web.currency_symbol)
        // fd.append('theme_color', web.theme_color)

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/web/update_set`, fd, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            if (res.data.logout) {
                localStorage.removeItem(process.env.REACT_APP_TOKEN + "_admin")
                history.push('/admin')
            }
            alert(res.data.msg)
            setState({ ...state, loading: false })
            if (!res.data.success) {
                console.log(res.data)
            }
        }).catch((err) => {
            console.log(err)
            setState({ ...state, loading: true })
        })
    }

    return (
        <Box p={2} >
            <Stack alignItems={'center'} direction={'row'} justifyContent='space-between'>
                <Typography fontWeight={'bold'} >App Config</Typography>
            </Stack>
            <Box mt={2} mb={2}>
                <Divider />
            </Box>

            {
                web_set ? (
                    <form onSubmit={updateWeb} encType='formdata/multi-part' >
                        <Stack direction={'column'} spacing={2}>
                            <Stack alignItems='center' border={1} borderRadius={2} p={2}>
                                <Button variant='outlined' component="label">
                                    <input
                                        accept="image/png, image/jpeg, image/jpg"
                                        type="file"
                                        hidden
                                        onChange={(e) => setState({ ...state, logo_image: e.target.files[0] })}
                                    />
                                    {
                                        state.logo_image ? (
                                            <img src={URL.createObjectURL(state.logo_image)} style={{ height: 200, width: 200, borderRadius: 5 }} />
                                        ) : (
                                            web.logo ? (
                                                <img src={`/images/${web.logo}`} style={{ height: 200, width: 200, borderRadius: 5 }} />
                                            ) : <AddPhotoAlternate sx={{ height: 200, width: 200 }} />
                                        )
                                    }
                                </Button>
                                <Typography>LOGO</Typography>

                            </Stack>


                            <TextField required onChange={(e) => setWeb({ ...web, app_name: e.target.value })} InputLabelProps={{ shrink: true }} value={web.app_name} label="App Name" fullWidth size="small" />
                            <TextField required onChange={(e) => setWeb({ ...web, currency_symbol: e.target.value })} InputLabelProps={{ shrink: true }} value={web.currency_symbol} label="Currency Symbol" fullWidth size="small" />

                            {/* <Stack alignItems={'flex-start'}>
                                <Box p={2} bgcolor='black' borderRadius={2} border={1} borderColor={web.theme_color} >
                                    <Typography sx={{ mb: 2 }} color='gray' align='center' >Choose Theme Color</Typography>
                                    <SketchPicker color={web.theme_color} onChangeComplete={(e) => setWeb({ ...web, theme_color: e.hex })} />
                                </Box>
                            </Stack> */}

                            <LoadingButton loading={state.loading} type="submit" variant='contained' >Save</LoadingButton>

                        </Stack>
                    </form>
                ) : (
                    <LinearProgress />
                )
            }

        </Box>
    )
}

export default AppConfig