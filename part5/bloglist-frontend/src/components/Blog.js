import React, { useState } from 'react'

const Blog = ({ blog, removeHandler, likeHandler }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='blogHeader'>
        {blog.title} -- {blog.author} {' '}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='blogDetails'>
        {blog.title} -- {blog.author} {' '}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        <span className='blog-likes'>{`likes ${blog.likes} `}</span>
        <button onClick={likeHandler} className='likeButton'>like</button>
        <br />
        <button onClick={removeHandler}>remove</button>
      </div>
    </div>
  )
}

export default Blog
