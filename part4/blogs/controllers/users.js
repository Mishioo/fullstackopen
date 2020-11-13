const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (reqest, response) => {
  const users = await User.find({})
  response.json(users)
})

router.post('/', async (reqest, response, next) => {
  const pass = reqest.body.password
  try {
    if (!pass || pass.length < 3) {
      throw new Error(
        'Password must be given and at least 3 characters long.'
      )
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(pass, saltRounds)

    const user = new User({
      username: reqest.body.username,
      name: reqest.body.name,
      passwordHash
    })
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    next(error)
    return
  }
})

module.exports = router