import fs from "fs";

class GlobalConfigHandler {
    globalConfigPath: string;
    apiPort: number;
    interfacePort: number;
    endpointConfigPath: string;
    echoBaseRoute: string;
    apiBaseRoute: string;
    endpointDirectory: string;

    constructor(globalConfigPath) {
        this.globalConfigPath = globalConfigPath;
    }

    retrieveGlobalConfig() {
        const globalConfig = JSON.parse(fs.readFileSync(this.globalConfigPath, `utf-8`));

        try {
            this.apiPort = parseInt(globalConfig.apiport);
            this.interfacePort = parseInt(globalConfig.interfacePort);
            this.endpointConfigPath = globalConfig.endpoint.configpath;
            this.echoBaseRoute = globalConfig.endpoint.echobaseroute;
            this.apiBaseRoute = globalConfig.endpoint.apiprefix;
            this.endpointDirectory = globalConfig.endpointDirectory;
        } catch (err) {
            console.error(err);
        }
    }
}

export default GlobalConfigHandler;
