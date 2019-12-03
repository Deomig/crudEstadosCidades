// Import packages
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
// App
const app = express()
// Morgan
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))
 
// Starting server 
app.listen(3001, function(){ console.log('Listen API (Port: 3001) ...') })