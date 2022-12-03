const { validationResult } = require('express-validator')
const response = require('../ultis/rep')


module.exports = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  } else {
    next()
  }
}
  