const { body, validationResult } = require('express-validator')

module.exports = {
  urlValidator: [
    body('url')
      .exists()
      .trim()
      .isURL()
      .withMessage('請輸入正確的網址且不可為空白')
  ]
}
