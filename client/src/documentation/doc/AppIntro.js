import { Box, Button, CardMedia, Divider, Typography } from '@mui/material'
import React from 'react'

const AppIntro = () => {
    return (
        <Box>
            <Typography align='center' fontWeight={'bold'} variant='h5' >WebApp Setup</Typography>


            <Box mb={6} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Setup SMTP</Typography>
                <Typography fontSize={15} color="gray"  >Go to admin panel yourdomain.com/admin and SMTP config option. Without this settings your forget password won't work</Typography>

                <Box mt={2} mb={4}>
                    <CardMedia src='/documentation/o1.jpg' component="img" height={'100%'} />
                </Box>
            </Box>


            <Box mb={6} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Setup Payment Gateways</Typography>
                <Typography fontSize={15} color="gray"  >Add your payment credentials here. Payment options won't work if you enter wrong details here.</Typography>

                <Box mt={2} mb={4}>
                    <CardMedia src='/documentation/o2.jpg' component="img" height={'100%'} />
                </Box>
            </Box>

            <Box mt={2} p={4} bgcolor='orange' borderRadius={2}>
                <Typography color='black' >⁍ ‣ For support or installation service shoot an email at <a
                    onClick={() => window.open('mailto:hello@hamidsaifi.com')}
                    style={{ color: 'black', cursor: 'pointer', fontWeight: 'bolder' }} >hello@hamidsaifi.com</a> </Typography>
            </Box>


        </Box>
    )
}

export default AppIntro