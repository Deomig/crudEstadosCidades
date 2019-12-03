const express = require('express')
const router = express.Router()
const VerifyToken = require('../helpers/VerifyToken') 

const data = require('../models/estado.model')
const m = require('../helpers/middlewares')
// Routes
module.exports = router 

/* All datas */
router.get('/', VerifyToken, async (req, res) => {
  await data.getDatas()
  .then(datas => res.json(datas))
  .catch(err => {
      if (err.status) {
          res.status(err.status).json({ message: err.message })
      } else {
          res.status(500).json({ message: err.message })
      }
  })
})

/* A data by id */
router.get('/:id', VerifyToken, m.mustBeInteger, async (req, res) => {
  const id = req.params.id
  await data.getData(id)
  .then(data => res.json(data))
  .catch(err => {
      if (err.status) {
          res.status(err.status).json({ message: err.message })
      } else {
          res.status(500).json({ message: err.message })
      }
  })
})

/* Insert a new post */
router.post('/', VerifyToken, m.checkFieldsPostEstado, async (req, res) => {   
  await data.insertData(req.body)
  .then(data => res.status(201).json({
      message: `O Estado #${data.id} foi criado`,
      content: data
  }))
  .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a post */
router.put('/:id', VerifyToken, m.mustBeInteger, m.checkFieldsPostEstado, async (req, res) => {
  const id = parseInt(req.params.id)
  
  await data.updateData(id, req.body)
  .then(data => res.json({
      message: `O Estado #${id} foi alterado`,
      content: data
  }))
  .catch(err => {
      if (err.status) {
          res.status(err.status).json({ message: err.message })
      }
      res.status(500).json({ message: err.message })
  })
})

/* Delete a data */
router.delete('/:id', VerifyToken, m.mustBeInteger, async (req, res) => {
  const id = req.params.id
  
  await data.deleteData(id)
  .then(data => res.json({
      message: `O Estado #${id} foi deletado`
  }))
  .catch(err => {
      if (err.status) {
          res.status(err.status).json({ message: err.message })
      }
      res.status(500).json({ message: err.message })
  })
})