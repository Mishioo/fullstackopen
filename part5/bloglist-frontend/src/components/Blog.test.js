import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component
const BLOG = {
  title: 'Blog Title',
  author: 'Blog Author',
  likes: 1,
  user: 'bloguserid',
  url: 'http:\\blog.url',
}

beforeEach(() => {
  component = render(
    <Blog blog={BLOG} />
  )
})

test('renders content', () => {
  expect(component.container).toHaveTextContent(BLOG.title)
  expect(component.container).toHaveTextContent(BLOG.author)
  expect(component.container).toHaveTextContent(`likes ${BLOG.likes}`)
  expect(component.container).toHaveTextContent(BLOG.url)
})

test('default visibility', () => {
  const headerDiv = component.container.querySelector('.blogHeader')
  expect(headerDiv).not.toHaveStyle('display: none')
  const detailsDiv = component.container.querySelector('.blogDetails')
  expect(detailsDiv).toHaveStyle('display: none')
})

test('blog expanded', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  const headerDiv = component.container.querySelector('.blogHeader')
  expect(headerDiv).toHaveStyle('display: none')
  const detailsDiv = component.container.querySelector('.blogDetails')
  expect(detailsDiv).not.toHaveStyle('display: none')
})

test('clicking like button', () => {
  const mockHandler = jest.fn()
  component = render(
    <Blog blog={BLOG} likeHandler={mockHandler} />
  )
  const button = component.container.querySelector('.likeButton')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})