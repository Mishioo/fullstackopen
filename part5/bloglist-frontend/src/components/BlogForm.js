import React from 'react'
import blogService from '../services/blogs'
import notificationService from '../services/notifications'

const BlogForm = ({
  newTitle, setTitle,
  newAuthor, setAuthor,
  newUrl, setUrl,
  blogs, setBlogs  
}) => {
  const addBlog = async (event) => {
    try {
      event.preventDefault()
      const newBlog = await blogService.create({
        title: newTitle, author: newAuthor, url: newUrl
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(newBlog))
      notificationService.info(`New blog created: ${newTitle} by ${newAuthor}.`)
    } catch (err) {
      console.log('cannot create new blog entry')
      notificationService.error('Cannot create new blog, some error occurred.')
    }
  }
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addBlog}>
        <div>
        title
        <input
          type="text"
          value={newTitle}
          name="title"
          onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
        author
        <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
        url
        <input
          type="text"
          value={newUrl}
          name="url"
          onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm