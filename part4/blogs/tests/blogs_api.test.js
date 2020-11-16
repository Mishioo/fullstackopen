const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { initialBlogs } = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('../utils/config')


let ROOT_ID = undefined
let ROOT_TOKEN = undefined
let NEW_BLOG = undefined
let ROOT_PASSWORD = 'secret password'


beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash(ROOT_PASSWORD, 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
  ROOT_ID = user._id.toString()
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  ROOT_TOKEN = jwt.sign(userForToken, config.SECRET)

  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog({ ...blog, user: ROOT_ID }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  user.blogs = blogObjects.map(blog => blog._id)
  await user.save()

  NEW_BLOG = {
    title: 'New blog entry for testing!',
    author: 'Besty Blogger',
    url: 'http://www.definitellyrealblog.com',
    likes: 42,
    user: ROOT_ID,
  }
})


describe('/api/blogs', () => {
  describe('GET', () => {

    test('returned blogs are JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('number of blogs is correct', async () => {
      const resp = await api.get('/api/blogs')
      expect(resp.body).toHaveLength(helper.initialBlogs.length)
    })

    test('returned entries contain id field', async () => {
      const resp = await api.get('/api/blogs')
      expect(resp.body[0].id).toBeDefined()
      expect(resp.body[0].user.id).toEqual(ROOT_ID)
    })
  })


  describe('POST', () => {

    test('valid entry', async () => {
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${ROOT_TOKEN}`)
        .send(NEW_BLOG)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const resp = await api.get('/api/blogs')
      const titles = resp.body.map(r => r.title)

      expect(resp.body).toHaveLength(initialBlogs.length + 1)
      expect(titles).toContain('New blog entry for testing!')
      const user = await User.findById(ROOT_ID)
      expect(user.blogs.length).toBe(initialBlogs.length + 1)
    })

    test('unauthorized', async () => {
      await api
        .post('/api/blogs')
        .send(NEW_BLOG)
        .expect(401)
        .expect('Content-Type', /application\/json/)
      const resp = await api.get('/api/blogs')
      expect(resp.body).toHaveLength(initialBlogs.length)
    })

    test('default value for likes field is added', async () => {
      delete NEW_BLOG.likes
      const resp = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${ROOT_TOKEN}`)
        .send(NEW_BLOG)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      expect(resp.body.likes).toBeDefined()
      expect(resp.body.likes).toBe(0)
    })

    test('missing url causes code 400', async () => {
      delete NEW_BLOG.url
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${ROOT_TOKEN}`)
        .send(NEW_BLOG)
        .expect(400)
    })

    test('missing title causes code 400', async () => {
      delete NEW_BLOG.title
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${ROOT_TOKEN}`)
        .send(NEW_BLOG)
        .expect(400)
    })
  })
})


describe('/api/blogs/:id', () => {


  describe('GET', () => {
    test('return value is JSON', async () => {
      const blog = await Blog.findOne({})
      await api
        .get(`/api/blogs/${blog._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('returns expected entry', async () => {
      const blog = await Blog.findOne({})
      const result = await api.get(`/api/blogs/${blog._id}`)
      expect(result.body.title).toBe(blog.title)
      expect(result.body.user.id).toEqual(ROOT_ID)
    })
  })


  describe('DELETE', () => {

    test('non existant', async () => {
      await api
        .delete(`/api/blogs/${await helper.nonExistingId()}`)
        .set('Authorization', `Bearer ${ROOT_TOKEN}`)
        .expect(204)
    })

    test('check if actually deleted', async () => {
      const blog = new Blog(NEW_BLOG)
      await blog.save()
      const id = blog._id.toString()
      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${ROOT_TOKEN}`)
        .expect(204)
      const ids = (await helper.entriesInDb()).map(blog => blog.id)
      expect(ids).not.toContain(id)
    })

    test('unauthorized', async () => {
      const blog = new Blog(NEW_BLOG)
      await blog.save()
      const id = blog._id.toString()
      await api
        .delete(`/api/blogs/${id}`)
        .expect(401)
    })
  })


  describe('PUT', () => {

    test('changes number of likes', async () => {
      const blog = await Blog.findOne({})
      const result = await api
        .put(`/api/blogs/${blog._id}`)
        .send({ likes: 69 })
      expect(result.body.likes).toBe(69)
      const updated = await Blog.findById(blog._id)
      expect(updated.likes).toBe(69)
    })
  })
})


describe('/api/users', () => {
  describe('GET', () => {
    test('response as JSON', async ( done ) => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(done)
    })
    test('starting user is correct', async () => {
      const usersAtStart = await helper.usersInDb()
      const resp = await api.get('/api/users')
      expect(resp.body.length).toBe(usersAtStart.length)
      expect(resp.body[0].username).toBe('root')
      expect(resp.body[0].passwordHash).not.toBeDefined()
      expect(resp.body[0].blogs.length).toBe(initialBlogs.length)
    })
  })
  describe('POST', () => {
    test('adding new valid user', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
    describe('adding invalid user', () => {
      test('no username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
          name: 'Kobe Lnicky',
          password: 'somepass',
        }
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
      test('username too short', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
          username: 'q',
          name: 'Kobe Lnicky',
          password: 'somepass',
        }
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
      test('username not unique', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
          username: 'root',
          name: 'Kobe Lnicky',
          password: 'somepass',
        }
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
      test('no password', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
          username: 'kobe_12',
          name: 'Kobe Lnicky',
        }
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
      test('password too short', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
          username: 'kobe_12',
          name: 'Kobe Lnicky',
          password: 'p',
        }
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
    })
  })
})


describe('/api/login', () => {
  test('correct password', async () => {
    const resp = await api
      .post('/api/login')
      .send({ username: 'root', password: ROOT_PASSWORD })
      .expect(200)
    const token = resp.body.token
    expect(token).toBeDefined()
    const decoded = jwt.verify(token, config.SECRET)
    expect(decoded.username).toEqual('root')
    expect(decoded.id).toEqual(ROOT_ID)
  })
  test('wrong password', async () => {
    await api
      .post('/api/login')
      .send({ username: 'root', password: 'wrong pass' })
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})