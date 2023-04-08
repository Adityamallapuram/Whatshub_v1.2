import React from 'react'
import { BotProvider } from '../../../context/BotContext'
import { Box, Typography, Stack, Divider } from '@mui/material'
import { AddReply } from './components/AddReply'
import InitialScreen from './components/InitialScreen'

const WhatsAppBot = () => {

    return (
        <BotProvider>
            <Box p={2}>
                <Typography fontWeight={'bold'} >WhatsApp Bot</Typography>
                <Typography color='gray' variant='caption' >Add a custom reply of your added messages.</Typography>


                <Box mt={2} mb={2}>
                    <Divider />
                </Box>

                <InitialScreen />

            </Box>
        </BotProvider>
    )
}

export default WhatsAppBot