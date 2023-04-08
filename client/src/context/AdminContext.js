import React from 'react'

export const AdminContext = React.createContext(null)

export const AdminProvider = (props) => {
    const [data, setData] = React.useState({
    })
    return (
        <AdminContext.Provider value={{ data, setData }}>
            {props.children}
        </AdminContext.Provider>
    )
}

