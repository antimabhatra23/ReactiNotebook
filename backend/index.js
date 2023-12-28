const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors')

connectToMongo();
// JavaScript is a Non-blocking 
const app = express()
const port = 5000

// Request(MiddileWare)
app.use(cors())
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})

