import React from 'react'
import { BotContext } from '../../../../context/BotContext'
import { Box, Stack, Typography, } from '@mui/material'
import { Delete, Reply } from '@mui/icons-material'

const RunningBot = () => {
    const botState = React.useContext(BotContext)
    return (
        <div>
            <Box mb={2} borderRadius={2} bgcolor='green' p={2}>
                <Typography color='white' fontWeight={'bold'} >Running...</Typography>
                <Typography color='black' variant='body2'  >Logout the session from your whstapp mobile app to delete this bot or create new or contact admin if any issue</Typography>
            </Box>
            <Stack direction={'column'} spacing={2}>
                {
                    botState.data.bot_data.map((i, key) => {
                        return (
                            <Box key={key} borderRadius={4} p={2} bgcolor='black'>
                                <Stack alignItems={'flex-start'} >
                                    <Box minWidth={60} mr={'40%'} bgcolor={'#3f50b5'} p={1} borderRadius={2}>
                                        <Typography variant='caption' color='black' >{i.in}</Typography>
                                    </Box>
                                </Stack>
                                <Stack mt={1} alignItems={'flex-end'} >
                                    <Box ml={'40%'} bgcolor={'#262626'} p={1} borderRadius={2}>
                                        <Box minWidth={60} bgcolor={'#273550'} p={1} borderRadius={2}>
                                            <Reply sx={{ color: 'gray', height: 20, width: 20 }} />
                                            <Typography fontSize={10} color='gray' >{i.in}</Typography>
                                        </Box>
                                        <Box minWidth={60} mr={1} mt={1} >
                                            <Typography variant='caption' color='gray' >{i.out}</Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box >
                        )
                    })
                }
            </Stack>
        </div>
    )
}

export default RunningBot