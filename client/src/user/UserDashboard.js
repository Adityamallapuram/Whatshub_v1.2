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
import { ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'
import { Dashboard as DashboardIcon, Logout, ForwardToInbox, SmartToy, History, Castle, Create, Face, SettingsBackupRestore } from '@mui/icons-material'
import UserDashPage from './UserDashPage';
import { useHistory } from 'react-router-dom';
import GetWebSet from '../utils/GetWebSet';
import GetUserByToken from '../utils/GetUserByToken';

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


function UserDashboard() {
    const [open, setOpen] = React.useState(window.innerWidth < 615 ? false : true);
    const history = useHistory()
    const { user_by_token } = GetUserByToken()
    const { web_set } = GetWebSet()

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let foo = params.get('page');

    React.useEffect(() => {
        setPage(parseInt(foo) || 0)
    }, [foo])

    const [page, setPage] = React.useState(null)
    const toggleDrawer = () => {
        if (window.innerWidth < 615) {
            setOpen(false)
            return
        }
        setOpen(!open);
    };

    const menudata = [
        {
            name: "Dashboard",
            icon: <DashboardIcon />,
        },
        {
            name: "Instances",
            icon: <Face />,
        },
        {
            name: "Send Message",
            icon: <Face />,
        },
        {
            name: "New Campaign",
            icon: <ForwardToInbox />,
        },
        {
            name: "Campaign History",
            icon: <History />,
        },
        {
            name: "WhatsApp Bot",
            icon: <SmartToy />,
        },
        {
            name: "Manage Plan",
            icon: <Castle />,
        },
        {
            name: "Ping to Admin",
            icon: <Create />,
        },
        {
            name: "Profile",
            icon: <Face />,
        },
        {
            name: "Reports",
            icon: <Face />,
        },
    ]


    return (
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
                        Hi{user_by_token && ", " + user_by_token.name}!
                    </Typography>
                    <IconButton onClick={() => {
                        if (window.confirm("Are your sure?")) {
                            localStorage.removeItem(process.env.REACT_APP_TOKEN + "_user")
                            history.push('/user')
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
                    <Stack direction='row' alignItems={'center'} spacing={2}>
                        {
                            <Typography fontWeight={'bold'} color='white' >{web_set && web_set.app_name}</Typography>
                        }
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Stack>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {
                        menudata.map((item, key) => {
                            return (
                                <ListItemButton style={{ backgroundColor: page === key ? "#212121" : null }} onClick={() => {
                                    history.push(`/user?page=${key}`)
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
                                <UserDashPage page={parseInt(page)} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
    );
}

export default function Dashboard() {
    return <UserDashboard />;
}