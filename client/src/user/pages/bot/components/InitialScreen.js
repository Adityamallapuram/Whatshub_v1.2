import { LinearProgress, Zoom, Box } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { BotContext } from '../../../../context/BotContext'
import { AddReply } from './AddReply'
import RunningBot from './RunningBot'

const InitialScreen = () => {
    const botState = React.useContext(BotContext)
    const [state, setState] = React.useState({
        loading: true
    })
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")

    function getBot() {
        setState({ ...state, loading: true })
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/bot/get_one`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            setState({ ...state, loading: false })
            if (res.data.success) {
                if (res.data.data) {
                    botState.setData({ ...botState.data, running_bot: true, bot_data: JSON.parse(res.data.data.reply) })
                }
            }
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if (!token) {
            return
        }
        getBot()
    }, [token])

    return (
        <div>
            {
                state.loading ? (
                    <LinearProgress />
                ) : (
                    botState.data.running_bot ? (
                        <Zoom in={true} >
                            <Box>
                                <RunningBot />
                            </Box>
                        </Zoom>
                    ) : (
                        <Zoom in={true} >
                            <Box>
                                <AddReply />
                            </Box>
                        </Zoom>
                    )
                )
            }
        </div>
    )
}

export default InitialScreen