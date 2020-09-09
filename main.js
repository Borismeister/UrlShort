const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: 'Zadarnovskiy1',
    port: 5432,
});

client.connect();
const app = express();
app.use('/', express.static('public'))
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'))

function getrandom(){
  let random_string = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 4);
  return random_string
}

app.get('/', (req, res) => {
  console.log(req.query)
  res.sendStatus(200)
})

app.get('/generate', (req, res)=>{
  let short = getrandom()



  res.json({
    url: short
  })
})

app.get('/:id', (req, res)=>{
  res.send(req.params.id)
})

app.listen('4000', ()=>{
  console.log("Listening on port 4000")
})
