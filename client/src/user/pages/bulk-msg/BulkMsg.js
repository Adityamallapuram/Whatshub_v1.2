import React from 'react'
import { SendBulkProvider } from '../../../context/SendBulkContext'
import { Box, Divider, Typography, Stack } from '@mui/material'
import StepComp from './components/StepComp'

const BulkMsg = () => {

    return (
        <SendBulkProvider>
            <Box p={2} >
                <Stack direction={'row'} alignItems='center'>
                    <Typography fontWeight="bold" >Send Bulk WhatsApp</Typography>
                </Stack>
                <Box mt={2} mb={2}>
                    <Divider />
                </Box>

                <StepComp />

            </Box>
        </SendBulkProvider>
    )
}

export default BulkMsg