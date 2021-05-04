const router = require('express').Router()
const db = require('./model')

// -- POST /api/users
router.post('/', async (req, res) => {
  const newUser = req.body
  try {
    if (!newUser.name || !newUser.bio) {
      res
        .status(400)
        .json({ message: 'Please provide name and bio for the user' })
    } else {
      const createUser = await db.insert(newUser)
      res.status(201).json(createUser)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// -- GET /api/users
router.get('/', (req, res) => {
  db.find()
    .then(usr => res.status(200).json(usr))
    .catch(err => res.status(500).json(err))
})

// -- GET /api/users/:id
router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(usr => {
      !usr
        ? res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist' })
        : res.status(200).json(usr)
    })
    .catch(err => res.status(500).json(err))
})

// -- DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(usr =>
      !usr
        ? res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist' })
        : res.status(200).json(usr)
    )
    .catch(err => res.status(500).json(err))
})

// -- PUT /api/users/:id
router.put('/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(u => {
      if (!req.body.name || !req.body.bio) {
        res
          .status(400)
          .json({ message: 'Please provide name and bio for the user' })
      } else if (!u) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist' })
      } else {
        res.status(200).json(u)
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'The user information could not be modified' })
    )
})

module.exports = router
