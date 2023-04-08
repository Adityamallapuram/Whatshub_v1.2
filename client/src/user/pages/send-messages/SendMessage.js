import { Box, Stack } from '@mui/material'
import React from 'react'
import SendSingle from './components/SendSingle'
import SendMedia from './components/SendMedia'

const SendMessage = () => {
    return (
        <Box bgcolor={'black'} p={4}>
            <Stack direction={'column'} spacing={3}>
                {/* <SendSingle /> */}
                <SendMedia />
            </Stack>
        </Box>
    )
}

export default SendMessage