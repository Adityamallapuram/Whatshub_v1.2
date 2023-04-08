import React from 'react'
import GetTokenAdmin from './GetTokenAdmin'
import axios from 'axios'

const GetAllUserAdmin = () => {
    const { token_admin } = GetTokenAdmin()
    const [all_users, setState] = React.useState("")
    React.useEffect(() => {
        if (!token_admin) {
            return
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/get_all_user`, {
            headers: {
                Authorization: "Bearer " + token_admin
            }
        }).then((res) => {
            setState(res.data.data)
        })
            .catch((err) => console.log(err))
    }, [token_admin])
    return { all_users }
}

export default GetAllUserAdmin