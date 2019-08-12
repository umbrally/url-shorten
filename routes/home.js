const express = require('express')
const router = express.Router()
const URL = require('../models/url.js')
const { urlValidator } = require('../lib/validator.js')
const { validationResult } = require('express-validator')
let root = 'https://pure-ocean-86993.herokuapp.com'
if (process.env.NODE_ENV !== 'production') {
  root = 'localhost:3000'
}

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', urlValidator, (req, res) => {
  // 使用express-validator的validationResult收集錯誤訊息，若使用者輸入非網址或空白則提醒使用者錯誤訊息
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('there are something wrong')
    let errorsMessages = []
    errors.array().forEach(error => {
      errorsMessages.push({ message: error.msg })
      console.log(errorsMessages)
    })
    return res.render('index', { errorsMessages })
  }
  else {
    let randomCode = ''
    let tag = 'on'
    // 確認randomCode 是否已經存在database以避免重複, 如果沒有則新增一筆資料並存檔
    async function checkURL() {
      try {
        while (tag === 'on') {
          randomCode = require('../lib/random.js')()
          tag = await URL.findOne({ randomCode: randomCode }).exec().then(url => {
            if (url) { return 'on' }
            else { return 'off' }
          })
        }
        const url = new URL({
          originURL: req.body.url,
          randomCode: randomCode
        })
        url.save(err => {
          if (err) {
            console.log(err)
            return res.status(422).json(err)
          }
          res.render('index', { randomCode, root })
        })
      }
      catch (err) { console.warn(err) }
    }
    checkURL()
  }
})

router.get('/:randomCode', (req, res) => {
  if (!req.params.randomCode) { return res.redirect('/') }
  else {
    URL.findOne({ randomCode: req.params.randomCode }, (err, record) => {
      console.log('a', record)
      const origin = record.originURL
      console.log('b', origin)
      if (err) {
        console.log(err)
        return res.status(422).json(err)
      }
      return res.redirect(`${origin}`)
      // return res.redirect('/')
    })
  }

})


module.exports = router