import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router-dom'

const GetUserByToken = () => {
    const [user_by_token, setState] = React.useState("")
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")
    const history = useHistory()
    React.useEffect(() => {
        if (!token) {
            return
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get_user_by_token`, {
            headers: {
                Authorization: "Beare " + token
            }
        }).then((res) => {
            if (res.data.logout) {
                localStorage.removeItem(process.env.REACT_APP_TOKEN + "_user")
                history.push("/user/login")
            }
            if (!res.data.success) {
                console.log(res.data)
            }
            setState(res.data.data)
        })
            .catch((err) => console.log(err))
    }, [token])
    return { user_by_token }
}

export default GetUserByToken