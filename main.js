const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const { Client } = require('pg');

const client = new Client({
    user: 'Max',
    host: 'localhost',
    database: 'urls',
    password: 'pass1234',
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

app.get('/generate', (req, res)=>{
  let short = getrandom()
  let long = req.query.url;
  let time = new Date().getTime();

  const text = `insert into short_urls(short, long, time_to_delete) values($1, $2, $3)`;
  const values = [short, long, time + 259200000];
  
  client
  .query(text, values)
  .catch(e => console.error(e.stack))
  res.json({
    url: short
  })
})

app.get('/:short', (req, res)=>{

  let text = `select long from short_urls where short = $1`
  let values = [req.params.short]

  client.query(text, values)
    .then(resp => {
      // res.json({
      //   short: req.params.short,
      //   long: resp.rows[0].long
      // })
      res.redirect(resp.rows[0].long)
    })
    .catch(e => console.error(e.stack))
})

app.listen('4000', ()=>{
  console.log("Listening on port 4000")
})
