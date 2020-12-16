import React from 'react'
import notificationService from '../services/notifications'


const Logout = ({ user, setUser }) => {
  const logoutAction = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    notificationService.info('Logout successful.')
  }
  return (
    <p>
      {`${user.name} logged in. `}
      <button onClick={logoutAction}>Logout</button>
    </p>
  )
}

export default Logout