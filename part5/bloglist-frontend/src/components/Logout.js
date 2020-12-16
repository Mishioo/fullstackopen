import React from 'react'

const Logout = ({ user, setUser }) => {
    const logoutAction = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }
    return (
        <p>
            {`${user.name} logged in. `}
            <button onClick={logoutAction}>Logout</button>
        </p>
    )
}

export default Logout