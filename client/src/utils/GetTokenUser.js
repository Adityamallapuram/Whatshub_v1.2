const GetTokenUser = () => {
    const token_user = localStorage.getItem(process.env.REACT_APP_TOKEN_USER)
    return { token_user }
}

export default GetTokenUser