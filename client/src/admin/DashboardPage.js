import React from 'react'
import AppConfig from './pages/app-config.js/AppConfig'
import DashScreen from './pages/DashScreen'
import ManagePlans from './pages/manage-plans/ManagePlans'
import ManageUsers from './pages/manage-users/ManageUsers'
import ManagePayGateway from './pages/payment-gateways/ManagePayGateway'
import PingFromUser from './pages/ping-user/PingFromUser'
import ProfileSet from './pages/profile/ProfileSet'
import SMTPConfig from './pages/smtp-config/SMTPConfig'
import TransLog from './pages/trans-log/TransLog'

const DashboardPage = (props) => {
    return (
        <div style={{ minHeight: '80vh' }} >
            {props.page === 0 && <DashScreen />}
            {props.page === 1 && <ManageUsers />}
            {props.page === 2 && <ManagePlans />}
            {props.page === 3 && <ManagePayGateway />}
            {props.page === 4 && <SMTPConfig />}
            {props.page === 5 && <PingFromUser />}
            {props.page === 6 && <AppConfig />}
            {props.page === 7 && <TransLog />}
            {props.page === 8 && <ProfileSet />}
        </div>
    )
}

export default DashboardPage