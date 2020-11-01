const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, resp, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return resp.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return resp.status(400).send({ error: error.message })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}