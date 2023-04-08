import React from 'react'
import WhatsAppBot from './pages/bot/WhatsAppBot'
import BulkMsg from './pages/bulk-msg/BulkMsg'
import MsgHistory from './pages/msg-history/MsgHistory'
import OptPlan from './pages/opt-plan/OptPlan'
import PingToAdmin from './pages/ping/PingToAdmin'
import UpdateProfile from './pages/profile/UpdateProfile'
import UserDash from './pages/UserDash'
import Instance from './pages/instances/Instance'
import SendMessage from './pages/send-messages/SendMessage'
import CheckLogs from './pages/check-logs/CheckLogs'

const UserDashPage = (props) => {
    return (
        <div>
            {props.page === 0 && <UserDash />}
            {props.page === 1 && <Instance />}
            {props.page === 2 && <SendMessage />}
            {props.page === 3 && <BulkMsg />}
            {props.page === 4 && <MsgHistory />}
            {props.page === 5 && <WhatsAppBot />}
            {props.page === 6 && <OptPlan />}
            {props.page === 7 && <PingToAdmin />}
            {props.page === 8 && <UpdateProfile />}
            {props.page === 9 && <CheckLogs />}
        </div>
    )
}

export default UserDashPage