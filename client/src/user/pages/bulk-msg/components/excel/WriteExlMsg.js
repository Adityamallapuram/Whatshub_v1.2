import { Box, Chip, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { SendBulkContext } from '../../../../../context/SendBulkContext'
import AddMediaComp from '../AddMediaComp'

const WriteExlMsg = () => {
    const sendBulk = React.useContext(SendBulkContext)

    function returnBoth() {
        return sendBulk.data.excel_array.map((i) => {
            if (!i.var_one || !i.var_two) {
                return "no"
            } else {
                return 'yes'
            }
        })
    }

    return (
        <div>
            {
                returnBoth().includes('no') &&
                <Box p={2} mb={2} borderRadius={2} bgcolor='orange'>
                    <Typography color='black' variant='body2' >It seems your excel does not have variables in all row it will be sending as null</Typography>
                </Box>
            }

            <Box mb={2}>
                <Stack spacing={2} direction={'row'}>
                    <Chip onClick={() => sendBulk.setData({ ...sendBulk.data, sending_msg: sendBulk.data.sending_msg + "{var_one}" })} label="{var_one}" />
                    <Chip onClick={() => sendBulk.setData({ ...sendBulk.data, sending_msg: sendBulk.data.sending_msg + "{var_two}" })} label="{var_two}" />
                </Stack>
            </Box>

            <TextField
                fullWidth
                multiline
                rows={4}
                value={sendBulk.data.sending_msg}
                helperText="You can use your variable(s) as dynamic keyword"
                onChange={(e) => sendBulk.setData({ ...sendBulk.data, sending_msg: e.target.value })}
                label="Write your message here" placeholder='hello {var_one} you booking number is {var_two}' />

            <AddMediaComp />

        </div>
    )
}

export default WriteExlMsg