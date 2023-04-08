import { FavoriteBorder } from '@mui/icons-material'
import { Button, Grid, Typography, Zoom } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import { useHistory } from 'react-router-dom'

const DonePage = () => {
    const history = useHistory()
    return (
        <Box p={2} bgcolor={'black'}>
            <Grid container minHeight={'100vh'} alignItems='center' justifyContent={'center'} >
                <Grid item>
                    <Zoom in={true} >
                        <Stack alignItems={'center'} direction={'column'} spacing={2}>
                            <FavoriteBorder sx={{ color: 'red', height: 100, width: 100 }} />
                            <Typography color='gray' >Done!</Typography>
                            <Button onClick={() => {
                                history.goBack()
                            }} >Go Back</Button>
                        </Stack>
                    </Zoom>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DonePage