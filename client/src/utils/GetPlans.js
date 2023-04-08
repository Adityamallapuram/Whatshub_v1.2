import React from 'react'
import axios from 'axios'
import { GlobalContext } from '../context/GlobalContext'

const GetPlans = () => {
    const [plan_data, setState] = React.useState("")
    const globalContext = React.useContext(GlobalContext)
    async function fetchPlans() {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/plan/get`)
        globalContext.setData({ ...globalContext.data, plan_data: res.data.data })
        if (!res.data.success) {
            console.log(res.data)
        }
        setState(res.data.data)
    }
    React.useEffect(() => {
        fetchPlans()
    }, [])
    return { plan_data }
}

export default GetPlans