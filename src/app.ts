import express from 'express';
import EndpointHandler from './EndpointHandler';

const app = express();
const port = 3000;

const endpoints: EndpointHandler = new EndpointHandler();
const dirLocation: string = "C:/Projects/chameleon-api-simulator/.testconfigs/"
const url: string = "https://api-nba-v1.p.rapidapi.com/seasons?league=standard&season=2023&team=2"

endpoints.retrieveAPIConfigs(dirLocation);
console.log(endpoints.matchURLParamters(url));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});