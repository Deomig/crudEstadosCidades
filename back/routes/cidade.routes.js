const express = require('express')
const router = express.Router()
const data = require('../models/cidade.model')
const m = require('../helpers/middlewares')
const VerifyToken = require('../helpers/VerifyToken') 
// Routes
module.exports = router
 
/* All datas */
router.get('/', VerifyToken, async (req, res) => {
  await data.getDatasCity()
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
  await data.getDataCity(id)
  .then(data => res.json(data))
  .catch(err => {
      if (err.status) {
          res.status(err.status).json({ message: err.message })
      } else {
          res.status(500).json({ message: err.message })
      }
  })
})

/* Insert a new cidade */
router.post('/', VerifyToken, m.checkFieldsPostCidade, async (req, res) => {
  await data.insertDataCity(req.body)
  .then(data => res.status(201).json({
      message: `A Cidade #${data.id} foi criada`,
      content: data
  }))
  .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a cidade */
router.put('/:id', VerifyToken, m.mustBeInteger, m.checkFieldsPostCidade, async (req, res) => {
  const id = req.params.id
  await data.updateDataCity(id, req.body)
  .then(data => res.json({
      message: `A Cidade #${id} foi alterada`,
      content: data
  }))
  .catch(err => {
      if (err.status) {
          res.status(err.status).json({ message: err.message })
      }
      res.status(500).json({ message: err.message })
  })
})
 
/* Delete a cidade */
router.delete('/:id', VerifyToken, m.mustBeInteger, async (req, res) => {
  const id = req.params.id  
  await data.deleteDataCity(id)
  .then(data => res.json({
    message: `A Cidade #${id} foi deletada`
  }))
  .catch(err => {
      if (err.status) {
          res.status(err.status).json({ message: err.message })
      }
      console.log("nok")
      res.status(500).json({ message: err.message })
  })
})