import fs, { readdirSync } from "fs";
const path = require("path");

class ExistingEndpointsHandler {
    simulatorFileNames: string[];
    dirname: string;

    constructor(path: string) {
        if (fs.existsSync(path)) {
            this.dirname = path;
            this.simulatorFileNames = readdirSync(path);
        }
    }

    private getParameterValues(fileContent: any): string[] {
        const parameterNames: string[] = [];
        const endpoint: string = Object.keys(fileContent)[0];
        const parameters = fileContent[endpoint].parameters;
        for (let i = 0; i < parameters.length; i++) {
            parameterNames.push(parameters[i].name);
        }
        return parameterNames;
    }

    private getContentsOfFiles() {
        const simulators: EndpointDisplay[] = [];
        for (const fileName of this.simulatorFileNames) {
            const filePath: string = this.dirname + path.sep + fileName;
            const fileContent: any = JSON.parse(fs.readFileSync(filePath, `utf-8`));
            const simulator: EndpointDisplay = {
                name: fileName.split(".")[0],
                endpoint: Object.keys(fileContent)[0],
                parameterNames: this.getParameterValues(fileContent),
            };
            simulators.push(simulator);
        }
        return simulators;
    }

    retrieveListOfEndpointDisplayValues(): EndpointDisplay[] {
        return this.getContentsOfFiles();
    }
}

export default ExistingEndpointsHandler;
