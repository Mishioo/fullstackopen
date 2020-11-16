const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const config = require('../utils/config')
const User = require('../models/user')

router.post('/', async (request, response) => {
  const user = await User.findOne({ username: request.body.username })
  const passOK = user === null ? false : await bcrypt.compare(
    request.body.password, user.passwordHash
  )
  if (!(user && passOK)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(userForToken, config.SECRET)
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router