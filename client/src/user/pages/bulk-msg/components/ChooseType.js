import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { SendBulkContext } from '../../../../context/SendBulkContext'

const ChooseType = () => {
    const sendBulk = React.useContext(SendBulkContext)
    return (
        <div>
            <Stack direction={'column'} spacing={2}>
                <Button onClick={() => sendBulk.setData({ ...sendBulk.data, type: "paste", step: 1 })} >Paste Numbers</Button>
                <Button onClick={() => sendBulk.setData({ ...sendBulk.data, type: "excel", step: 1 })} >Upload Excel</Button>
            </Stack>
        </div>
    )
}

export default ChooseType