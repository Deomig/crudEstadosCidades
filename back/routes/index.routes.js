const express = require('express')
const router = express.Router()
module.exports = router
router.use('/api/estados', require('./estado.routes'))
router.use('/api/cidades', require('./cidade.routes'))