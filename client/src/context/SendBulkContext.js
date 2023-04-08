import React from 'react'
import moment from 'moment'

export const SendBulkContext = React.createContext(null)

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

var twentyMinutesLater = new Date();

export const SendBulkProvider = (props) => {
    const [data, setData] = React.useState({
        step: 0,
        chip_color: 'primary',
        with_media: false,
        time: moment().add(10, 'minutes'),
        // addType: 'excel',
        // sending_msg: "",
        // excel_array: [],
        schedule: false,
        paste_media: false,
        delay_in_sec: 10,
    })
    return (
        <SendBulkContext.Provider value={{ data, setData }}>
            {props.children}
        </SendBulkContext.Provider>
    )
}

