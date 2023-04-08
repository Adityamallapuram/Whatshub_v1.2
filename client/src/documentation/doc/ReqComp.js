import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const ReqComp = () => {

    return (
        <Box>
            <Typography align='center' fontWeight={'bold'} variant='h5' >Requirements and Features</Typography>

            <Box mb={2} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Introduction</Typography>
                <Typography>A cloud based WhatsApp SAAS system where you can make a bulk campaign along with the WhatsApp bot. As this uses whatsapp web instance
                    so there is no hazard of banning whatsapp.
                </Typography>
            </Box>

            <Divider />


            <Box mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Requirements</Typography>
            </Box>
            <ul>
                <li>Vps or Any NodeJs Enabled Shared Hosting with pupptter installed</li>
                <li>MySQL Database</li>
                <li>Domain or Subdomain</li>
            </ul>

            <Divider />

            <Box mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Features</Typography>
            </Box>


            <ul>
                <Box mb={2} >
                    <li style={{ fontWeight: 'bold', fontSize: 15, }} >Secured Login</li>
                    <Typography fontSize={12}>Login options to prevent unauthorized access of your app.</Typography>
                </Box>
                <Box mb={2} >
                    <li style={{ fontWeight: 'bold', fontSize: 15, }} >Bulk SMS</li>
                    <Typography fontSize={12}>Send bulk sms along with any media with delay function.</Typography>
                </Box>
                <Box mb={2} >
                    <li style={{ fontWeight: 'bold', fontSize: 15, }} >WhatsApp Bot</li>
                    <Typography fontSize={12}>Make an auto reply whatsapp bot easily.</Typography>
                </Box>
                <Box mb={2} >
                    <li style={{ fontWeight: 'bold', fontSize: 15, }} >Subscription</li>
                    <Typography fontSize={12}>Make dynamic plans for user subscription.</Typography>
                </Box>
                <Box mb={2} >
                    <li style={{ fontWeight: 'bold', fontSize: 15, }} >Account Manage</li>
                    <Typography fontSize={12}>Manage your users with account managing.</Typography>
                </Box>
                <Box mb={2} >
                    <li style={{ fontWeight: 'bold', fontSize: 15, }} >Payment Gateways</li>
                    <Typography fontSize={12}>Razorpay and Paypal payment mode with offline payment system.</Typography>
                </Box>
                <Box mb={2} >
                    <li style={{ fontWeight: 'bold', fontSize: 15, }} >Transaction Log</li>
                    <Typography fontSize={12}>Transaction log of every payment transaction.</Typography>
                </Box>
                <Box mb={2} >
                    <li style={{ fontWeight: 'bold', fontSize: 15, }} >Connect with admin</li>
                    <Typography fontSize={12}>User and admin direct message system.</Typography>
                </Box>
                <Box mb={2} >
                    <li style={{ fontWeight: 'bold', fontSize: 15, }} >Much More.</li>
                </Box>
            </ul>


        </Box>
    )
}

export default ReqComp