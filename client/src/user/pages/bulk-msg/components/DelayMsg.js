import React from 'react'
import { Box, Stack, Typography, Slider, Switch } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment'
import { SendBulkContext } from '../../../../context/SendBulkContext';

const DelayMsg = () => {
    const sendBulk = React.useContext(SendBulkContext)
    return (
        <div>

            <Typography variant='body2' color='gray' >
                Time delay in each message: {sendBulk.data.delay_in_sec} sec.
            </Typography>
            <Box p={1} >
                <Slider
                    onChange={(e, val) => sendBulk.setData({ ...sendBulk.data, delay_in_sec: parseInt(val) })}
                    defaultValue={sendBulk.data.delay_in_sec}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={3}
                    max={50}
                />
            </Box>


            {/* <Box borderRadius={2} bgcolor={'#222222'} p={1}>
                <Stack direction={'row'} alignItems='center' justifyContent="space-between">
                    <Typography color='gray' variant='body2'>Schedule this campaign</Typography>
                    <Switch checked={sendBulk.data.schedule} onChange={(e) => sendBulk.setData({ ...sendBulk.data, schedule: e.target.checked })} />
                </Stack>

                {
                    sendBulk.data.schedule &&
                    <Box mt={1}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack direction={'column'} spacing={2}>
                                <Typography color={'orange'} variant='caption' >your campaign will be start on {sendBulk.data.time.format("DD-MMMM-YYYY HH:mm A")}</Typography>

                                <Box p={2} borderRadius={2} bgcolor={'black'} >
                                    <Typography variant='caption'>Hours Later</Typography>
                                    <Slider
                                        onChange={(e, val) => sendBulk.setData({ ...sendBulk.data, time: moment().add(val, 'hours') })}
                                        marks
                                        valueLabelDisplay="auto"
                                        step={1}
                                        min={0}
                                        max={24}
                                    />
                                </Box>
                                <Box p={2} borderRadius={2} bgcolor={'black'} >
                                    <Typography variant='caption'>Minutes Later</Typography>
                                    <Slider
                                        onChange={(e, val) => sendBulk.setData({ ...sendBulk.data, time: moment().add(val, 'minutes') })}
                                        marks
                                        valueLabelDisplay="auto"
                                        step={1}
                                        min={10}
                                        max={59}
                                    />
                                </Box>
                            </Stack>
                        </LocalizationProvider>
                    </Box>

                }
            </Box> */}
        </div>
    )
}

export default DelayMsg