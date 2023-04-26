import fs from 'fs';

class EndpointHandler {
    
    endpoints: {[key:string]: Array<APIEndpointValue>} = {};

    constructor() {
        if(!fs.existsSync(`./.testconfigs`)){
            fs.mkdirSync(`./.tesconfigs`)
        }
    }

    onConfigReadError(err: NodeJS.ErrnoException): void {
        console.error(err);
    }

    readAPIConfig(dirName: string, fileName: string): void {
        let content: any;
        try {
            content = JSON.parse(fs.readFileSync(dirName + fileName, `utf-8`))
        }
        catch (err) {
            this.onConfigReadError(err);
            return;  
        }
        const endpoint: string = Object.keys(content)[0];
        const endpointValue: APIEndpointValue = {
            parameters: content[endpoint].parameters,
            response: content[endpoint].response,
            status: content[endpoint].status
        }
        if (this.endpoints.hasOwnProperty(endpoint)) { this.endpoints[endpoint].push(endpointValue); }
        else { this.endpoints[endpoint] = [endpointValue]; }
    }

    retrieveAPIConfigs(dirName: string): void {
        let fileNames: Array<string>; 
        try {
            fileNames = fs.readdirSync(dirName) 
        }
        catch (err) {
            this.onConfigReadError(err);
            return;
        }

        for (const fileName of fileNames) {
            this.readAPIConfig(dirName, fileName);
        }
        console.log(this.endpoints)
    }

    matchURLParamters(parameters: string): APIEndpointValue {
        let matchedConfig: APIEndpointValue;

        return matchedConfig;
    }

}

export default EndpointHandler;