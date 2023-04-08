import React from 'react'
import { SendBulkContext } from '../../../../context/SendBulkContext'
import SendExcelMsg from './excel/SendExcelMsg'
import SendPasteMsg from './paste/SendPasteMsg'

const SendMessage = () => {
    const sendBulk = React.useContext(SendBulkContext)

    return (
        <div>
            {
                sendBulk.data.type === 'excel' &&
                <SendExcelMsg />
            }
            {
                sendBulk.data.type === 'paste' &&
                <SendPasteMsg />
            }
        </div>
    )
}

export default SendMessage