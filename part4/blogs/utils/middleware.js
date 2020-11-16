const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  let token = null
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    token = auth.substring(7)
  }
  req.token = token
  next()
}

const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, resp, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return resp.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return resp.status(400).send({ error: error.message })
  } else if (error.message.startsWith('Password ')) {
    return resp.status(400).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return resp.status(401).json({ error: 'invalid token' })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}