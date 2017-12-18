// Require modules

const express = require('express');
const logger = require('morgan');
const path = require('path');


const app = express();
const PORT = 8000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());


// app.use('/static', express.static(__dirname +'/public'))


app.get('/', (req, res) => {
  res.send("Luigi");
})

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mario.html'));
})

app.post('/send', (req, res) => {
  const { hello, hi } = req.body;
  // console.log(req.body);
  console.log(hello);
  console.log(hi);
  res.json(req.body);
})













app.listen(PORT, () => {
  console.log('Yo check it out, we have a connection on PORT: ', PORT);
})