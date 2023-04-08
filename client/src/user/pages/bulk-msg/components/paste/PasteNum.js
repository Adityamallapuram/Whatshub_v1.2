import { TextField, Box, Button, Stack, Divider } from '@mui/material'
import React from 'react'
import { SendBulkContext } from '../../../../../context/SendBulkContext'

const PasteNum = () => {
    const sendBulk = React.useContext(SendBulkContext)
    return (
        <div>
            <TextField
                value={sendBulk.data.pasted_string}
                fullWidth
                placeholder='918888888888, 15555555555'
                label="Please paste numbers here"
                helperText="Add a comma after the number with country code"
                multiline
                onChange={(e) => {
                    sendBulk.setData({ ...sendBulk.data, pasted_string: e.target.value.replace(/[^0-9\.,]/g, "") })
                }}
                rows={4} />

            <Box mb={2} mt={2} >
                <Divider />
            </Box>

            <Stack direction={'column'} spacing={2}>

                <Button
                    disabled={sendBulk.data.pasted_string ? false : true}
                    onClick={() => sendBulk.setData({ ...sendBulk.data, step: 2 })}
                    variant='contained'
                    size='small'>Next</Button>

                <Button
                    onClick={() => sendBulk.setData({ ...sendBulk.data, step: 0 })}
                    variant='outlined'
                    size='small'>Back</Button>

            </Stack>
        </div>
    )
}

export default PasteNum