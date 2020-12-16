import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

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

  return (
    <div>
      <h2>blogs</h2>
      {user === null ?
        LoginForm({ username, setUsername, password, setPassword, setUser }) :
        Logout({ user, setUser })}
      {user !== null && BlogForm({
        newTitle, setTitle,
        newAuthor, setAuthor,
        newUrl, setUrl,
        blogs, setBlogs
      })}
      {user !== null &&
        blogs
          .filter(blog => blog.user.username === user.username)
          .map(blog => <Blog key={blog.id} blog={blog} />)
      }
    </div>
  )
}

export default App