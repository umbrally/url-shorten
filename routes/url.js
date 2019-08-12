const express = require('express')
const router = express.Router()
const URL = require('../models/url.js')

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