const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findOne({ username: 'root' })
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog
    .findById(id)
    .populate('user', { username: 1, name: 1 })
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
  const user = await User.findOne({ username: 'root' })

  const UpdatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  }
  const result = await Blog
    .findByIdAndUpdate(id, UpdatedBlog, { new: true })
    .populate('user', { username: 1, name: 1 })

  response.json(result)
})

module.exports = blogsRouter