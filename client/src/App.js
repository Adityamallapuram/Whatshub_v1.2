import React from 'react'
import { Switch } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PublicRoute from './routing/PublicRoute'
import AdminRoute from './routing/AdminRoute'
import LoginAdmin from './admin/LoginAdmin'
import AdminDashboard from './admin/AdminDashboard'
import LoginUser from './user/LoginUser';
import UserRoute from './routing/UserRoute'
import UserDashboard from './user/UserDashboard';
import { GlobalProvider } from './context/GlobalContext';
import DonePage from './user/pages/DonePage';
import GetWebSet from './utils/GetWebSet';
import RecoveryUser from './recovery/RecoverUser';
import RecoveryAdmin from './recovery/RecoverAdmin';
import InstallApp from './installation/InstallApp';
import DocScreen from './documentation/DocScreen';
import Error404 from './Error404';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


export default function ToggleColorMode() {
  const [splash, setSplash] = React.useState(true)

  React.useEffect(() => {
    setMode(localStorage.getItem('theme') ? (localStorage.getItem('theme')) : (localStorage.setItem('theme', 'dark'), "dark"))
    setTimeout(() => {
      setSplash(false)
    }, 1000);
  }, [])

  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <GlobalProvider>
        <ThemeProvider theme={theme}>
          <Switch>
            <AdminRoute exact path="/admin" component={AdminDashboard} />
            <PublicRoute exact path="/admin/login" component={LoginAdmin} />
            <PublicRoute exact path="/user/login" component={LoginUser} />
            <UserRoute exact path="/user" component={UserDashboard} />
            <UserRoute exact path="/done-page" component={DonePage} />
            <PublicRoute exact path="/recovery-user/:id" component={RecoveryUser} />
            <PublicRoute exact path="/recovery-admin/:id" component={RecoveryAdmin} />
            <PublicRoute exact path="/install" component={InstallApp} />
            <PublicRoute exact path="/doc" component={DocScreen} />
            <PublicRoute path='*' exact={true} component={Error404} />
          </Switch>
        </ThemeProvider>
      </GlobalProvider>
    </ColorModeContext.Provider>
  );
}