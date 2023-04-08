import React from 'react'
import { SendBulkContext } from '../../../../context/SendBulkContext'
import { Zoom, Box } from '@mui/material'
import ChooseType from './ChooseType'
import CollectNum from './CollectNum'
import ComposeMsg from './ComposeMsg'
import SendMessage from './SendMessage'

const VisibleComp = () => {
    const sendBulk = React.useContext(SendBulkContext)
    return (
        <div>
            {
                sendBulk.data.step === 0 &&
                <Zoom in={sendBulk.data.step === 0 ? true : false} >
                    <Box>
                        <ChooseType />
                    </Box>
                </Zoom>
            }
            {
                sendBulk.data.step === 1 &&
                <Zoom in={sendBulk.data.step === 1 ? true : false} >
                    <Box>
                        <CollectNum />
                    </Box>
                </Zoom>
            }
            {
                sendBulk.data.step === 2 &&
                <Zoom in={sendBulk.data.step === 2 ? true : false} >
                    <Box>
                        <ComposeMsg />
                    </Box>
                </Zoom>
            }
            {
                sendBulk.data.step === 3 &&
                <Zoom in={sendBulk.data.step === 3 ? true : false} >
                    <Box>
                        <SendMessage />
                    </Box>
                </Zoom>
            }
        </div>
    )
}

export default VisibleComp