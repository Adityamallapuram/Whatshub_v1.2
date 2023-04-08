import React from 'react'
import GetAllUserAdmin from '../../../utils/GetAllUserAdmin'
import { AdminContext } from '../../../context/AdminContext'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, CircularProgress, Dialog, Grid, IconButton, LinearProgress, Typography } from '@mui/material'
import { Close, Edit, Login } from '@mui/icons-material';
import DialogHeader from '../../../common/DialogHeader';
import EditUser from './components/EditUser'
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

const ManageUsers = () => {
    const [state, setState] = React.useState({
        dialog: false
    })
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")

    const adminContext = React.useContext(AdminContext)
    const { all_users } = GetAllUserAdmin()
    React.useEffect(() => {
        if (!all_users) {
            return
        }
        adminContext.setData({ ...adminContext.data, all_users: all_users })
    }, [all_users])


    function direcLogin(e) {
        setState({ ...state, loading: true })
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/direct_login`, {
            uid: e
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            setState({ ...state, loading: false })
            localStorage.setItem(process.env.REACT_APP_TOKEN + "_user", res.data.token)
            window.open('/user')
        }).catch((err) => console.log(err))
    }


    return (
        <div >
            <Dialog fullScreen open={state.dialog} onClose={() => setState({ ...state, dialog: false })} >
                <DialogHeader title="Edit User"
                    closebtn={<IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => {
                            setState({ ...state, dialog: false })
                        }}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>} />
                <EditUser user={state.user} />
            </Dialog>
            {
                adminContext.data.all_users ? (
                    <Box height='80vh'>
                        <DataGrid
                            getRowId={(row) => row.id}
                            rows={[...adminContext.data.all_users].reverse()}
                            columns={[
                                {
                                    headerName: "Login", field: 'uid', flex: 1, renderCell: data =>
                                        state.loading ? (
                                            <CircularProgress size={25} />
                                        ) : (
                                            <IconButton
                                                onClick={() => direcLogin(data.row.uid)}
                                            >
                                                <Login />
                                            </IconButton>
                                        )
                                },
                                { headerName: "Name", field: 'name', flex: 1, },
                                { headerName: "Email", field: 'email', flex: 1, },
                                { headerName: "Mobile", field: 'mobile', flex: 1, },
                                {
                                    headerName: "Update", field: 'id', flex: 1, renderCell: data => <IconButton onClick={() => {
                                        setState({ ...state, dialog: true, user: data.row })
                                    }} >
                                        <Edit />
                                    </IconButton>
                                },
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
        </div>
    )
}

export default ManageUsers