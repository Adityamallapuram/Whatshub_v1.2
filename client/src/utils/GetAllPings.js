import React from 'react'
import axios from 'axios'

const GetAllPings = () => {
    const [all_ping, setState] = React.useState("")
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/ping/get_all`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => setState(res.data.data))
            .catch((err) => console.log(err))
    }, [])
    return { all_ping }
}

export default GetAllPings