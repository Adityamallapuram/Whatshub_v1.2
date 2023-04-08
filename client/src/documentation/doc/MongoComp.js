import { Box, CardMedia, Divider, Typography } from '@mui/material'
import React from 'react'

const MongoComp = () => {
    return (
        <Box>
            <Typography align='center' fontWeight={'bold'} variant='h5' >MongoDB Configuration</Typography>


            <Box mb={6} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Step 1: Search MySQL</Typography>
                <Typography fontSize={15} color="gray"  >Login into you cpanel or your panel and search for mysql.</Typography>

                <Box mt={2}>
                    <CardMedia src='/documentation/ms0.jpg' component="img" height={'100%'} />
                </Box>
            </Box>

            <Box mb={6} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Step 2: Create Database</Typography>
                <Typography fontSize={15} color="gray"  >Write a database name and click on create database button.</Typography>

                <Box mt={2}>
                    <CardMedia src='/documentation/ms1.jpg' component="img" height={'100%'} />
                </Box>
            </Box>

            <Box mb={6} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Step 3: Create User</Typography>
                <Typography fontSize={15} color="gray"  >Write a user name and click on create database button.</Typography>

                <Box mt={2}>
                    <CardMedia src='/documentation/ms2.jpg' component="img" height={'100%'} />
                </Box>
            </Box>


            <Box mb={6} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Step 4: Grant permissions</Typography>
                <Typography fontSize={15} color="gray"  >Go to "Add User To Database" and choose your created user and database then click on ad give a checkmark to ALL PRIVILEGES and hit "Make Changes" button.</Typography>

                <Box mt={2}>
                    <CardMedia src='/documentation/ms3.jpg' component="img" height={'100%'} />
                </Box>
            </Box>


            <Box mb={6} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Step 4: Add credentials into code</Typography>
                <Typography fontSize={15} color="gray"  >Go to the code root folder then edit .env file add your database credentials there. Also you can change JWTKEY if you know what is this or keep it as it is.</Typography>

                <Box mt={2}>
                    <CardMedia src='/documentation/ms5.jpg' component="img" height={'100%'} />
                </Box>
            </Box>

        </Box>
    )
}

export default MongoComp