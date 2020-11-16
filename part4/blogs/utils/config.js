require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (
  process.env.NODE_ENV === 'test'
  || process.env.NODE_ENV === 'development'
) {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

let SECRET = process.env.SECRET

if (
  process.env.NODE_ENV === 'test'
  || process.env.NODE_ENV === 'development'
) {
  SECRET = process.env.TEST_SECRET
}

module.exports = {
  MONGODB_URI,
  SECRET,
  PORT
}
