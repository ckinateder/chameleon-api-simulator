import express from 'express';
import EndpointHandler from './EndpointHandler';

const app = express();
const port = 3000;

const endpoints = new EndpointHandler();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});