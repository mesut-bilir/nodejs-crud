const jwt = require('jsonwebtoken')

const jwtSecret = 'mesut'

exports.createToken = payload => {
  return jwt.sign(payload, jwtSecret)
}

exports.verifyToken = token => {
  return jwt.verify(token, jwtSecret)
}

