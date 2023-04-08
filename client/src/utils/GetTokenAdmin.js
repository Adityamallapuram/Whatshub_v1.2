import React from "react"

const GetTokenAdmin = () => {
    const token_admin = localStorage.getItem(process.env.REACT_APP_TOKEN + "_admin")
    React.useEffect(() => {
        if (!token_admin) {
            return
        }
    }, [token_admin])
    return { token_admin }
}

export default GetTokenAdmin