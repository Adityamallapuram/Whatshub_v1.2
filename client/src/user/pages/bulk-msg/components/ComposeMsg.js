import { Box, Divider, Button, Stack } from '@mui/material'
import React from 'react'
import { SendBulkContext } from '../../../../context/SendBulkContext'
import WriteExlMsg from './excel/WriteExlMsg'
import WritePasteMsg from './paste/WritePasteMsg'

const ComposeMsg = () => {
    const sendBulk = React.useContext(SendBulkContext)
    return (
        <>
            {
                sendBulk.data.type === 'excel' &&
                <WriteExlMsg />
            }
            {
                sendBulk.data.type === 'paste' &&
                <WritePasteMsg />
            }


            <Box mb={2} mt={2} >
                <Divider />
            </Box>

            <Stack direction={'column'} spacing={2}>

                {
                    sendBulk.data.with_media ? (
                        <Button
                            disabled={sendBulk.data.sending_msg && sendBulk.data.media_url ? false : true}
                            onClick={() => sendBulk.setData({ ...sendBulk.data, step: 3 })}
                            variant='contained'
                            size='small'>Next</Button>
                    ) : (
                        <Button
                            disabled={sendBulk.data.sending_msg ? false : true}
                            onClick={() => sendBulk.setData({ ...sendBulk.data, step: 3 })}
                            variant='contained'
                            size='small'>Next</Button>
                    )
                }

                <Button
                    onClick={() => sendBulk.setData({ ...sendBulk.data, step: 1 })}
                    variant='outlined'
                    size='small'>Back</Button>

            </Stack>
        </>
    )
}

export default ComposeMsg