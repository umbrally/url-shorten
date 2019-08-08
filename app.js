const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const URL = require('./models/url.js')
const { urlValidator } = require('./lib/validator.js')
const { validationResult } = require('express-validator')

const port = 3000
// 連線mongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortURL', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', urlValidator, (req, res) => {
  // 使用express-validator的validationResult收集錯誤訊息，若使用者輸入非網址或空白則提醒使用者錯誤訊息
  console.log(req.body.url)
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
          randomCode = require('./lib/random.js')()
          tag = await URL.findOne({ randomCode: randomCode }).exec().then(url => {
            if (url) { return 'on' }
            else { return 'off' }
          })
        }
        const url = new URL({
          originURL: req.body.url,
          randomCode: randomCode
        })
        console.log('aaaaaaaaa', req.body.url)
        url.save(err => {
          if (err) {
            console.log(err)
            return res.status(422).json(err)
          }
          res.render('index', { randomCode })
        })
      }
      catch (err) { console.warn(err) }
    }
    checkURL()
  }
})

// app.get('/:randomCode', (req, res) => {
//   URL.findOne({ randomCode: req.params.randomCode }, (err, url) => {
//     if (err) {
//       console.log(err)
//       return res.status(422).json(err)
//     }
//     return res.redirect(`${url.originURL}`)
//   })
// })

app.listen(process.env.PORT || 3000, () => {
  console.log('web server is running')
})


