const errorHandler = (err, req, res, next) => {
  console.log(err)

  let errors = []
  let statusCode = 500

  switch(err.name) {
    case 'AuthorizationFailed':
      errors.push('not allowed to access')
      statusCode = 403
      break
    case 'AuthenticationFailed':
    case 'JsonWebTokenError':
      errors.push('failed to authenticate')
      statusCode = 401
      break
    case 'SequelizeUniqueConstraintError':
    case 'SequelizeValidationError':
      err.errors.forEach(error => errors.push(error.message))
      statusCode = 400
      break
    default:
      errors.push(err.message || 'internal server error')
      statusCode = err.statusCode || 500
  }

  res.status(statusCode).json({ errors: errors })
}

module.exports = errorHandler