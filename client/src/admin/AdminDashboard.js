import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Dashboard as DashboardIcon, Logout, Group, ForwardToInbox, SendAndArchive, AppSettingsAlt, ReceiptLong, Settings, SettingsBackupRestore, PointOfSale, CreditCard, Face } from '@mui/icons-material'
import DashboardPage from './DashboardPage';
import { useHistory } from 'react-router-dom';
import { AdminProvider } from '../context/AdminContext';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://codeyon.com/">
                Codeyon
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


function AdminDashboard() {
    const [open, setOpen] = React.useState(true);
    const history = useHistory()

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let foo = params.get('page');

    React.useEffect(() => {
        setPage(parseInt(foo) || 0)
    }, [foo])

    const [page, setPage] = React.useState(null)
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const menudata = [
        {
            name: "Dashboard",
            icon: <DashboardIcon />,
        },
        {
            name: "Manage Users",
            icon: <Group />,
        },
        {
            name: "Manage Plans",
            icon: <PointOfSale />,
        },
        {
            name: "Payment Gateways",
            icon: <CreditCard />,
        },
        {
            name: "SMTP Config",
            icon: <ForwardToInbox />,
        },
        {
            name: "Ping From Users",
            icon: <SendAndArchive />,
        },
        {
            name: "App Config",
            icon: <AppSettingsAlt />,
        },
        {
            name: "Transaction Log",
            icon: <ReceiptLong />,
        },
        {
            name: "Profile",
            icon: <Face />,
        },
    ]

    return (
        <AdminProvider>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Hello, Admin!
                        </Typography>
                        <IconButton onClick={() => {
                            if (window.confirm("Are your sure?")) {
                                localStorage.removeItem(process.env.REACT_APP_TOKEN + "_admin")
                                history.push('/admin/login')
                            }
                        }} color="inherit">
                            <Logout />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {
                            menudata.map((item, key) => {
                                return (
                                    <ListItemButton style={{ backgroundColor: page === key ? "#212121" : null }} onClick={() => {
                                        history.push(`/admin?page=${key}`)
                                        setPage(key)
                                    }} key={key} >
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText secondary={item.name} />
                                    </ListItemButton>
                                )
                            })
                        }
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >

                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <DashboardPage page={parseInt(page)} />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </AdminProvider>
    );
}

export default function Dashboard() {
    return <AdminDashboard />;
}