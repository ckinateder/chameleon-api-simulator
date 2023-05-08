import InterfaceHandler from './InterfaceHandler';
import RequestHandler from './RequestHandler';

const apiPort: number = 3001;
const interfacePort: number = 3002;
const dirLocation: string = "./.testconfigs/"
const baseRoute: string = `/echoAPI/v1/`
const urlPrefix: string = `https://api-nba-v1.p.rapidapi.com/`


//const test: RequestHandler = new RequestHandler(apiPort, baseRoute, dirLocation, urlPrefix);
const testInterface: InterfaceHandler = new InterfaceHandler(interfacePort, baseRoute, dirLocation, urlPrefix);

testInterface.runRequest();

