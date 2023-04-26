import express from 'express';
import EndpointHandler from './EndpointHandler';

const app = express();
const port = 3000;

const endpoints: EndpointHandler = new EndpointHandler();
const dirLocation: string = "C:/Projects/chameleon-api-simulator/.testconfigs/"

endpoints.retrieveAPIConfigs(dirLocation);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});