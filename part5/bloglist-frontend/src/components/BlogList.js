import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import notificationService from '../services/notifications'

const BlogList = ({ user, blogs, setBlogs }) => {

  const addLike = async (blog) => {
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

  const removeBlog = async (blog) => {
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

  return (
    <dir>
      {blogs
        .filter(blog => blog.user.username === user.username)
        .sort((a, b) => (b.likes - a.likes))
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            likeHandler={() => addLike(blog)}
            removeHandler={() => removeBlog(blog)}
          />
        ))}
    </dir>
  )
}

export default BlogList