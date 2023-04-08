import React from 'react'
import { Box, Button, Container, Dialog, Divider, Grid, Typography, Tabs, Tab } from '@mui/material'
import PropTypes from 'prop-types';
import ReqComp from './doc/ReqComp';
import MongoComp from './doc/MongoComp';
import DeployComp from './doc/DeployComp';
import AppIntro from './doc/AppIntro';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography color='white' >{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const DocScreen = () => {
    const [state, setState] = React.useState({})
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh' }} >
            <Dialog onClose={() => setState({ ...state, feeback_dialog: false })} open={state.feeback_dialog}>
                <Box p={4} >
                    <Typography color='white' >We would love to have a valuable feedback from you. Click the feeback button to raise a feedback for this app.</Typography>
                    <Box mt={2}>
                        <Button onClick={() => {
                            window.open('mailto:hello@hamidsaifi.com', "_blank")
                        }} variant='contained' color='success' >Feedback & Support</Button>
                    </Box>
                </Box>
            </Dialog>

            <Dialog fullWidth onClose={() => setState({ ...state, support_dialog: false })} open={state.support_dialog}>

                <Box p={4} >
                    <Box mb={2} >
                        <Grid container spacing={2} >
                            <Grid item xs={6} sm={6} lg={6}>
                                <Box borderRadius={2} bgcolor='black' p={2}>
                                    <Grid container spacing={2} direction={'column'} alignItems='center' justifyContent={'center'}>
                                        <Grid item>
                                            <Typography color='white' fontWeight={'bold'} variant='h5' >Only Android</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Divider />
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >App Logo</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >App Name</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >Admin Panel Setup</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >OneSignal Setup</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >Mongoose Setup</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >NodeJS Setup</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} lg={6}>
                                <Box borderRadius={2} bgcolor='black' p={2}>
                                    <Grid container spacing={2} direction={'column'} alignItems='center' justifyContent={'center'}>
                                        <Grid item>
                                            <Typography color='white' fontWeight={'bold'} variant='h5'>Android + IOS</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Divider />
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >App Logo</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >App Name</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >Admin Panel Setup</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >OneSignal Setup</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >Mongoose Setup</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color='white' variant='body2' >NodeJS Setup</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography fontWeight={'bold'} >Please email us at hello@hamidsaifi.com to our support team for Reskin buying or Support.</Typography>
                </Box>
            </Dialog>


            <Container maxWidth='lg'>
                <Box mt={2} mb={2}>
                    <Grid container justifyContent={'space-between'} spacing={2}>
                        <Grid item>
                            <Grid container alignItems={'flex-end'} direction={'row'}>
                                <Grid item>
                                    <Typography color='white' variant='h3' fontWeight={'bold'} >Whats</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color='white' variant='h3' >Ham</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color='white' variant='caption' >doc</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={1} direction={'row'}>
                                <Grid item>
                                    <Button onClick={() => setState({ ...state, feeback_dialog: true })} sx={{ textTransform: 'none' }} variant='outlined' color='secondary'>FeedBack & Support</Button>
                                </Grid>
                                {/* <Grid item>
                                    <Button onClick={() => setState({ ...state, support_dialog: true })} sx={{ textTransform: 'none' }} variant='outlined' color='inherit'>Contact & Support</Button>
                                </Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                <Box bgcolor={'#212121'} p={7} borderRadius={5}>
                    <Typography align='center' color='white' variant='h4' >Love from the Developer side!</Typography>
                    <Typography align='center' color='white' variant='h4' >💖</Typography>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs variant="scrollable" value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Requirements" {...a11yProps(0)} />
                            <Tab label="MySQL Setup" {...a11yProps(1)} />
                            <Tab label="Deploy App" {...a11yProps(2)} />
                            <Tab label="Other Setup" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ReqComp />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <MongoComp />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <DeployComp />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <AppIntro />
                    </TabPanel>
                </Box>
            </Container>
        </div>
    )
}

export default DocScreen