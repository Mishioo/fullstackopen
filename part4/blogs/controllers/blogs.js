const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.findById(id)
  if (result) {
    response.json(result)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.send(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const UpdatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }
  const result = await Blog.findByIdAndUpdate(id, UpdatedBlog, { new: true })

  response.json(result)
})

module.exports = blogsRouter