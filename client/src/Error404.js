import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'

const Error404 = () => {

    return (
        <Box p={2} bgcolor='black' minHeight={'100vh'} >
            <Container maxWidth='lg' >
                <Grid container alignItems={'center'} justifyContent='center' minHeight={'100vh'}>
                    <Grid item>
                        <Stack alignItems={'center'} direction={'column'} spacing={2}>
                            <Typography color='white' variant='h1'>404</Typography>
                            <Typography color='gray' variant='caption '>I m feeling lonley here.</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Error404