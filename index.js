const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { getFeeCtrl } = require('./src/controller')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/getfee', getFeeCtrl)

app.listen(8080, () => {
  console.log('listen on port 8080...')
})

// const privateKey = 'xnd_development_W7KGftGb6Q8uW6bbTqyKTInaKYW2Qx9l8APOUvJ9zKq2OW7lDlKKp3ud5KcLA'