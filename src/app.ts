import RequestHandler from './RequestHandler';


const port: number = 3001;
const dirLocation: string = "./.testconfigs/"
const baseRoute: string = `/echoAPI/v1/`
const urlPrefix: string = `https://api-nba-v1.p.rapidapi.com/`

const test: RequestHandler = new RequestHandler(port, baseRoute, dirLocation, urlPrefix);

test.runRequest();

