import { Box, Grid, Typography, LinearProgress, IconButton } from '@mui/material'
import React from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import axios from 'axios'

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <Box p={2} width={'100%'}  >
                <Grid container justifyContent={'space-between'} spacing={2}>
                    <Grid item>
                        <Typography variant='h5' >All Users</Typography>
                    </Grid>
                    <Grid item>
                        <GridToolbarExport />
                    </Grid>
                </Grid>
            </Box>
        </GridToolbarContainer>
    );
}

const CheckLogs = () => {
    const [report, setLogs] = React.useState("")
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")

    async function fetchData() {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/instance/get_logs`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        setLogs(res.data.data)
    }

    React.useEffect(() => {
        if (!token) return
        fetchData()
    }, [token])

    function delLog(e) {
        if (window.confirm('Are your sure ?')) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/instance/del_log`, {
                id: e
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                alert(res.data.msg)
                fetchData()
            }).catch((er) => console.log(er))
        }
    }

    return (
        <Box p={2}>
            <Typography fontWeight={'bold'} variant='h6' >Report Single Message</Typography>
            <Box mt={4}>
                {
                    report ? (
                        <Box height='80vh'>
                            <DataGrid
                                getRowId={(row) => row.id}
                                rows={[...report].reverse()}
                                columns={[
                                    { headerName: "ID", field: 'id', flex: 1, },
                                    { headerName: "Device", field: 'sender', flex: 1, },
                                    { headerName: "Receiver", field: 'receiver', flex: 1, },
                                    { headerName: "Status", field: 'status', flex: 1, },
                                    {
                                        headerName: "Delete", field: 'del', flex: 1, renderCell: data => {
                                            return (
                                                <IconButton onClick={() => delLog(data.row.id)} color='error' >
                                                    <Delete />
                                                </IconButton>
                                            )
                                        }
                                    }
                                ]}
                                pageSize={50}
                                rowsPerPageOptions={[50]}
                                checkboxSelection={false}
                                components={{
                                    Toolbar: CustomToolbar,
                                }}
                            />
                        </Box>
                    ) : <LinearProgress />
                }
            </Box>
        </Box>
    )
}

export default CheckLogs