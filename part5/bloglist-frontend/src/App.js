import React, { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import blogService from './services/blogs'
import notificationService from './services/notifications'
import { ErrorNotification, InfoNotification } from './components/Notifications'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    notificationService.setErrorSetter(setErrorMessage)
    notificationService.setInfoSetter(setInfoMessage)
  }, [])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async ({ newTitle, newAuthor, newUrl }) => {
    try {
      const newBlog = await blogService.create({
        title: newTitle, author: newAuthor, url: newUrl
      })
      setBlogs(blogs.concat(newBlog))
      notificationService.info(`New blog created: ${newTitle} by ${newAuthor}.`)
    } catch (err) {
      console.error('cannot create new blog entry: ', err)
      notificationService.error('Cannot create new blog, some error occurred.')
    } finally {
      blogFormRef.current.toggleVisibility()
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <ErrorNotification message={errorMessage} setter={setErrorMessage}/>
      <InfoNotification message={infoMessage} setter={setInfoMessage}/>
      {user === null ?
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
        /> :
        <Logout
          user={user}
          setUser={setUser}
        />}
      {user !== null &&
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      }
      {user !== null && <BlogList user={user} blogs={blogs} setBlogs={setBlogs} />}
    </div>
  )
}

export default App