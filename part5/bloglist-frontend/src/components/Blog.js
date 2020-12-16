import React, { useState } from 'react'
import blogService from '../services/blogs'
import notificationService from '../services/notifications'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    const updated = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      user: blog.user.id,
      url: blog.url,
    }
    try {
      const updatedBlog = await blogService.update(blog.id, updated)
      setBlogs(blogs.map(b => (b.id === updatedBlog.id ? updatedBlog : b)))
    } catch (err) {
      notificationService.error('Could not process your like.')
      console.error(err)
    }
  }

  const removeBlog = () => {
    const confirm = window.confirm('Are you sure? It will be lost forever!')
    if (confirm) {
      try {
        blogService.remove(blog.id)
        setBlogs(blogs.filter(b => (b.id !== blog.id)))
        notificationService.info(`Blog '${blog.title}' by ${blog.author} removed.`)
      } catch (err) {
        notificationService.error('Something went wrong! :(')
        console.error(err)
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} -- {blog.author} {' '}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} -- {blog.author} {' '}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        {`likes ${blog.likes} `} <button onClick={addLike} >like</button>
        <br />
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
