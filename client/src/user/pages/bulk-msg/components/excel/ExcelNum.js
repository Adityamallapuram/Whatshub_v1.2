import { Box, Button, Chip, Divider } from '@mui/material'
import { Stack } from '@mui/system'
import { Download, CloudUpload } from '@mui/icons-material'
import React from 'react'
import { SendBulkContext } from '../../../../../context/SendBulkContext'
import * as XLSX from 'xlsx/xlsx.mjs';

const ExcelNum = () => {
    const sendBulk = React.useContext(SendBulkContext)

    function handleChange(files) {
        const file = files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: 'array' });
            // find the name of your sheet in the workbook first
            let worksheet = workbook.Sheets['Sheet1'];

            // convert to json format
            const jsonData = XLSX.utils.sheet_to_json(worksheet)
            sendBulk.setData({ ...sendBulk.data, excel_array: jsonData })

            jsonData.find(i => typeof i.numbers !== 'number' ?
                [alert("Error found in numbers field"), sendBulk.setData({ ...sendBulk.data, excel_array: jsonData, chip_color: 'error', file: file })] :
                sendBulk.setData({ ...sendBulk.data, excel_array: jsonData, chip_color: 'success', file: file }))
        };
        reader.readAsArrayBuffer(file);
    }

    return (
        <div>
            <Box p={5} border={0.5} borderRadius={2}>
                <Stack spacing={2} direction={'column'} alignItems='center'>
                    {
                        sendBulk.data.file ? (
                            <Chip
                                color={sendBulk.data.chip_color}
                                onDelete={() => {
                                    sendBulk.setData({ ...sendBulk.data, file: "", excel_array: "" })
                                }} label={sendBulk.data.file.name} />
                        ) : (
                            <Button
                                startIcon={<CloudUpload />}
                                size='small'
                                component="label"
                                sx={{ textTransform: 'none' }}
                                variant='outlined' >
                                <input
                                    accept=".xlsx"
                                    type="file"
                                    hidden
                                    onChange={(e) => handleChange(e.target.files)}
                                />
                                Upload Excel  Sheet
                            </Button>
                        )
                    }

                    <Button
                        onClick={() => {
                            window.open('/whatsham-bulk-example.xlsx')
                        }}
                        color='secondary'
                        startIcon={<Download />}
                        style={{ textTransform: 'none' }}
                        size='small'>
                        Download Excel Demo Sheet
                    </Button>
                </Stack>
            </Box>

            <Box mb={2} mt={2} >
                <Divider />
            </Box>

            <Stack direction={'column'} spacing={2}>

                <Button
                    disabled={sendBulk.data.chip_color === 'success' && sendBulk.data.file ? false : true}
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

export default ExcelNum