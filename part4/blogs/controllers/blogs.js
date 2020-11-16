const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid ' })
  }
  const user = await User.findById(decodedToken.id)
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
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid ' })
  }
  const user = await User.findById(decodedToken.id)
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.send(204).end()
  } else if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(id)
    return response.send(204).end()
  } else if (blog) {
    return response.status(401).json({ error: 'unauthorized' })
  }
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