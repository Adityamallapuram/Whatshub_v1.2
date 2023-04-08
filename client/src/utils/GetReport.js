import axios from 'axios'
import React from 'react'

const GetReport = () => {
    const [report, setState] = React.useState("")
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")
    async function fetchData() {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/instance/get_logs`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        setState(res.data.data)
    }
    React.useEffect(() => {
        if (!token) return
        fetchData()
    }, [token])
    return { report }
}

export default GetReport