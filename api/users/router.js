const router = require('express').Router()
const db = require('./model')

// -- /users
router.get('/', (req, res) => {
  db.find()
    .then(usr => res.status(200).json(usr))
    .catch(err => res.status(500).json(err))
})

module.exports = router
