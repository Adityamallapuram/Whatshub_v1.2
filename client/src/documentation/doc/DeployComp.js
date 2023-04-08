import { Box, CardMedia, Divider, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

const DeployComp = () => {
    return (
        <Box>
            <Typography align='center' fontWeight={'bold'} variant='h5' >Deploy App</Typography>


            <Box mb={6} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Step 1: Creating Folder</Typography>
                <Typography fontSize={15} color="gray"   >Open you file manager and create a folder</Typography>

                <Box mt={2} mb={4}>
                    <CardMedia src='/documentation/node_one.jpg' component="img" height={'100%'} />
                </Box>

                <Typography fontSize={15} color="gray"   >Open your folder and upload upload_this.zip file</Typography>
                <Box mt={2} mb={4}>
                    <CardMedia src='/documentation/nodee.jpg' component="img" height={'100%'} />
                </Box>
                <Typography fontSize={15} color="gray"   >Extract upload_this.zip file in the folder</Typography>
                <Box mt={2}>
                    <CardMedia src='/documentation/nodeee.jpg' component="img" height={'100%'} />
                </Box>
            </Box>

            <Box mb={6} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Step 2: Search NodeJs</Typography>
                <Typography fontSize={15} color="gray"   >Go to Cpanel and search for NodeJs (Contact to your hostinger provider if its not exist or go to https://codeyonhost.com to get cheap one)</Typography>

                <Box mt={2}>
                    <CardMedia src='/documentation/node_two.jpg' component="img" height={'100%'} />
                </Box>
            </Box>

            <Box mb={6} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Step 3: Follow Below</Typography>
                <Typography fontSize={15} color="gray"   >Open NodeJs and follow these steps</Typography>

                <Box mt={2}>
                    <CardMedia src='/documentation/node_two.jpg' component="img" height={'100%'} />
                </Box>
                <Box mt={2} >
                    <CardMedia src='/documentation/node_three.jpg' component="img" height={'100%'} />
                    <Stack direction={'column'}>
                        <Typography mt={2} >Go to .env file and add all the variables here</Typography>
                        <Typography fontStyle={'italic'} color='gray' variant='caption' >JWTKEY=</Typography>
                        <Typography fontStyle={'italic'} color='gray' variant='caption' >DBHOST=</Typography>
                        <Typography fontStyle={'italic'} color='gray' variant='caption' >DBUSER=</Typography>
                        <Typography fontStyle={'italic'} color='gray' variant='caption' >DATABASE=</Typography>
                        <Typography fontStyle={'italic'} color='gray' variant='caption' >DBPASSWORD=</Typography>
                        <Typography fontStyle={'italic'} color='gray' variant='caption' >DBPORT=</Typography>
                    </Stack>
                </Box>
                <Box mt={2}>
                    <CardMedia src='/documentation/node_four.jpg' component="img" height={'100%'} />
                </Box>
                <Box mt={2}>
                    <CardMedia src='/documentation/node_five.jpg' component="img" height={'100%'} />
                </Box>
                <Box mt={2}>
                    <CardMedia src='/documentation/node_six.jpg' component="img" height={'100%'} />
                </Box>
                <Box mt={2}>
                    <CardMedia src='/documentation/node_seven.jpg' component="img" height={'100%'} />
                </Box>
            </Box>

            <Box mb={6} mt={2} >
                <Typography fontWeight={'bold'} variant='h6'>Step 4: Install App</Typography>
                <Typography fontSize={15} color="gray"   >Go to yourdomain.com/install and install the app.</Typography>

                <Box border={1} mt={2}>
                    <Box bgcolor={"#1B1B1B"} p={2}>
                        <Stack spacing={1} direction={'row'}>
                            <Box bgcolor={'red'} p={0.8} borderRadius="50%" />
                            <Box bgcolor={'yellow'} p={0.8} borderRadius="50%" />
                            <Box bgcolor={'green'} p={0.8} borderRadius="50%" />
                        </Stack>
                    </Box>
                    <CardMedia src='/documentation/node_eight.jpg' component="img" height={'100%'} />
                </Box>
            </Box>


        </Box>
    )
}

export default DeployComp