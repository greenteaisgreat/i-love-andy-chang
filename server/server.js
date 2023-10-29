const express = require('express');
require('dotenv').config();
const app = express();
const PORT = 3333;
const path = require('path');

const taskController = require('./controllers/taskController');
const db = require('./db');

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../views')));

//attempt to serve .css/.js static files
app.use(express.static(path.resolve(__dirname + '../assets/css')));
app.use(express.static(path.resolve(__dirname + '../assets/js')));

//connect to mongo DB
db();


app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

//~~~ REALLY unsure why .css/.js files aren't automatically being served from the .html pages;
//my understanding was that since .html files will have the links to the .css/.js files upon rendering,
// they would inherently have access to styling properties/functionality; this attempt doesn't work below
//for styling either ~~~
app.get('/', (req, res) => {
  res.status(200).setHeader('content-type', 'text/css').sendFile(path.resolve(__dirname, 'style.css'));
});


app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.post('/secret', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.postTask);
});

app.get('/secret', taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.getTask);
});

app.delete('/secret', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deleteTask);
});



app.all('*', (req, res) => {
  res.status(404).send('The page you are looking for cannot be found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'An unknown server error occurred',
    status: 500,
    message: {
      err: 'An internal error occurred'
    }
  };
  const errObj = Object.assign(defaultErr, err);

  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));