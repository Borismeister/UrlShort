const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const app = express();
app.use('/', express.static('public'))
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'))

app.get('/', (req, res) => {
  console.log(req.query)
  res.sendStatus(200)
})

app.get('/generate', (req, res)=>{
  res.json({
    url: req.query.url
  })
})

app.get('/:id', (req, res)=>{
  res.send(req.params.id)
})

app.listen('4000', ()=>{
  console.log("Listening on port 4000")
})
