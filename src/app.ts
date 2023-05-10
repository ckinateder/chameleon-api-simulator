import GlobalConfigHandler from './GlobalConfigHandler';
import RequestHandler from './RequestHandler';

const globalConfigPath: string = `././gconfig.json`;
const globalConfig = new GlobalConfigHandler(globalConfigPath);
globalConfig.retrieveGlobalConfig();

const test: RequestHandler = new RequestHandler(globalConfig);

test.runRequest();

