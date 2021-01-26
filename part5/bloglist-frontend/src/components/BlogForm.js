import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({ newTitle, newAuthor, newUrl })
    setTitle('')
    setAuthor('')
    setUrl('')
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
            id="blogFormTitle"
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
        author
          <input
            type="text"
            value={newAuthor}
            name="author"
            id="blogFormAuthor"
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
        url
          <input
            type="text"
            value={newUrl}
            name="url"
            id="blogFormUrl"
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit" id="blog-create-button">create</button>
      </form>
    </div>
  )
}

export default BlogForm