import React from 'react'
import Blog from './Blog'

const BlogList = ({ user, blogs, setBlogs }) => {
  return (
    <dir>
      {blogs
          .filter(blog => blog.user.username === user.username)
          .sort((a, b) => (b.likes - a.likes))
          .map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />)}
    </dir>
  )
}

export default BlogList