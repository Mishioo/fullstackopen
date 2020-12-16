import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import notificationService from '../services/notifications'
import PropTypes from 'prop-types'

const LoginForm = ({ username, setUsername, password, setPassword, setUser }) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      notificationService.info(`Welcome, ${user.name || user.username}.`)
    } catch (exception) {
      console.log('Invalid credentials')
      notificationService.error('Invalid credentials')
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm