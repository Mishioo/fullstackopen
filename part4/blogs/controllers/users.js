const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (reqest, response) => {
  const users = await User.find({})
  response.json(users)
})

router.post('/', async (reqest, response) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(reqest.body.password, saltRounds)

  const user = new User({
    username: reqest.body.username,
    name: reqest.body.name,
    passwordHash
  })
  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = router