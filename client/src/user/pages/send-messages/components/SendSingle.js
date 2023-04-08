import { ExpandMore, Send } from '@mui/icons-material'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import GetInstance from '../../../../utils/GetInstance'

const SendSingle = () => {
    const { instance } = GetInstance()
    const [state, setState] = React.useState({

    })
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant='h6'>Send Text</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box borderRadius={2} bgcolor={'black'} p={2} m={2}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography variant='h6' fontWeight={'bold'} >Send Text Message</Typography>

                        {instance ?
                            <Box mt={2}>
                                <Stack direction={'column'} spacing={2}>
                                    <FormControl
                                        size='small' fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Instance</InputLabel>
                                        <Select
                                            sx={{ borderRadius: 3 }}
                                            size='small'
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={Select Instance}
                                            label="Select Instance"
                                            onChange={(e) => setState({ ...state, client_id: e.target.value.client_id })}
                                        >
                                            {instance && instance.map((i, key) => {
                                                return (
                                                    <MenuItem key={key} value={10}>+{i.mobile}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Box> : <LinearProgress />}

                        <TextField
                            label="Enter contact number"
                            type='number'
                            size='small'
                            variant="outlined"
                            InputProps={{
                                style: {
                                    borderRadius: 14 // Customize the border radius as per your requirement
                                },
                            }}
                        />

                        <TextField
                            label="Enter your message"
                            rows={4}
                            multiline={true}
                            size='small'
                            variant="outlined"
                            InputProps={{
                                style: {
                                    borderRadius: 14 // Customize the border radius as per your requirement
                                },
                            }}
                        />

                        <Stack alignItems={'flex-end'}>
                            <Button
                                startIcon={<Send />}
                                sx={{ borderRadius: 2 }} variant='contained' >Send Message</Button>
                        </Stack>

                    </Stack>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

export default SendSingle