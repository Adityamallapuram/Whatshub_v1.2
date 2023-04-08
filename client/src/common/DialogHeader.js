import { AppBar, IconButton, Typography, Toolbar } from '@mui/material'

export default function DialogHeader(props) {
    return (
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                {props.closebtn}
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}