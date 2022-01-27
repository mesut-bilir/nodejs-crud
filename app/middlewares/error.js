const errorMiddleware = (err, req, res, next) => {
    let { statusCode, message } = err
     console.log(message);
    res.status(statusCode || 500).json({
      success: false,
      errors: [
        {
          msg: message,
        },
      ],
    })
  }
  
  module.exports = errorMiddleware
  