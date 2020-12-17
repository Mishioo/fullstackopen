import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#blogFormTitle')
  const author = component.container.querySelector('#blogFormAuthor')
  const url = component.container.querySelector('#blogFormUrl')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(author, {
    target: { value: 'whoever made this' }
  })
  fireEvent.change(url, {
    target: { value: 'https://somewhere.web' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog).toHaveBeenCalledWith({
    newTitle: 'testing of forms could be easier',
    newAuthor: 'whoever made this',
    newUrl: 'https://somewhere.web'
  })
})