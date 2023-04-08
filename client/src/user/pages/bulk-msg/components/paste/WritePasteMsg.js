import { TextField, } from '@mui/material'
import React from 'react'
import { SendBulkContext } from '../../../../../context/SendBulkContext'
import AddMediaComp from '../AddMediaComp'

const WritePasteMsg = () => {
    const sendBulk = React.useContext(SendBulkContext)
    const [state, setState] = React.useState({})
    return (
        <div>
            <TextField
                fullWidth
                multiline
                rows={4}
                value={sendBulk.data.sending_msg}
                onChange={(e) => sendBulk.setData({ ...sendBulk.data, sending_msg: e.target.value })}
                label="Write your message here" />

            <AddMediaComp />

        </div>
    )
}

export default WritePasteMsg