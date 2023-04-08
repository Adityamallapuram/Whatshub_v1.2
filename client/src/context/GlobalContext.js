import React from 'react'

export const GlobalContext = React.createContext(null)

export const GlobalProvider = (props) => {
    const [data, setData] = React.useState({
    })
    return (
        <GlobalContext.Provider value={{ data, setData }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

