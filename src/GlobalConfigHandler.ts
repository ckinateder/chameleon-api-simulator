import fs from 'fs';

class GlobalConfigHandler {

    globalConfigPath: string;
    apiPort: number;
    endpointConfigPath: string;
    echoBaseRoute: string;
    apiBaseRoute: string;

    constructor(globalConfigPath) {
        this.globalConfigPath = globalConfigPath;
    }

    retrieveGlobalConfig() {
        const globalConfig = JSON.parse(fs.readFileSync(this.globalConfigPath , `utf-8`));

        try {
            this.apiPort = parseInt(globalConfig.apiport);
            this.endpointConfigPath = globalConfig.endpoint.configpath;
            this.echoBaseRoute = globalConfig.endpoint.echobaseroute;
            this.apiBaseRoute = globalConfig.endpoint.apiprefix
        }
        catch (err) {
            console.error(err)
        }
    }
}

export default GlobalConfigHandler;