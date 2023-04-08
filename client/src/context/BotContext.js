import React from 'react'

export const BotContext = React.createContext(null)

export const BotProvider = (props) => {
    const [data, setData] = React.useState({
        reply: [],
        running_bot: false,
        bot_data: []
    })
    return (
        <BotContext.Provider value={{ data, setData }}>
            {props.children}
        </BotContext.Provider>
    )
}

