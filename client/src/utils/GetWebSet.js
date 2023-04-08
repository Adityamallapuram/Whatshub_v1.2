import axios from 'axios'
import React from 'react'

const GetWebSet = () => {
    const [web_set, setState] = React.useState("")
    async function fetchData() {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/web/get`)
        setState(res.data.data)
    }
    React.useEffect(() => {
        fetchData()
    }, [])
    return { web_set }
}

export default GetWebSet