import React from 'react'
import { SendBulkContext } from '../../../../context/SendBulkContext'
import ExcelNum from './excel/ExcelNum'
import PasteNum from './paste/PasteNum'

const CollectNum = () => {
    const sendBulk = React.useContext(SendBulkContext)
    return (
        <>
            {
                sendBulk.data.type === 'excel' &&
                <ExcelNum />
            }
            {
                sendBulk.data.type === 'paste' &&
                <PasteNum />
            }

        </>
    )
}

export default CollectNum