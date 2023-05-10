import RequestHandler from './RequestHandler';
import fs from 'fs';

const globalConfigPath: string = `././gconfig.json`;
const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath , `utf-8`));
let port: number, configPath: string, baseRoute: string, apiPrefix: string;

try {
    port = parseInt(globalConfig.hostport);
    configPath = process.env.USERPROFILE + globalConfig.endpoint.configpath;
    baseRoute = globalConfig.endpoint.echobaseroute;
    apiPrefix = globalConfig.endpoint.apiprefix
}
catch (err) {
    console.error(err)
}

const test: RequestHandler = new RequestHandler(port, configPath, baseRoute, configPath, apiPrefix);

test.runRequest();

