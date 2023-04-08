import axios from 'axios'
import React from 'react'

const GetInstance = () => {
    const [instance, setState] = React.useState("")
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")
    async function fetchData() {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/instance/get_all_token`, {
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
    return { instance }
}

export default GetInstance