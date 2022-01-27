// Handling errors plays a major role in your application. 
// you want to know the details of the issue and how to solve it. 

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

module.exports = CustomError
