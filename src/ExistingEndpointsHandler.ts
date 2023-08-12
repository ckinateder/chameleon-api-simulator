import fs, { readdirSync } from "fs";
const path = require("path");

class ExistingEndpointsHandler {
    simulatorFileNames: string[];
    simulators: EndpointDisplay[];
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
        const parameters = fileContent[endpoint].pa;
        for (let i = 0; i < parameters.length; i++) {
            parameterNames.push(parameters[i].name);
        }
        return parameterNames;
    }

    private getContentsOfFiles() {
        for (const fileName in this.simulatorFileNames) {
            console.log(fileName);
            const fileContent: any = JSON.parse(fs.readFileSync(this.dirname + path.sep + fileName, `utf-8`));
            const simulator: EndpointDisplay = {
                name: fileName,
                endpoint: Object.keys(fileContent)[0],
                parameterNames: this.getParameterValues(fileContent),
            };
            this.simulators.push(simulator);
        }
        return;
    }

    retrieveListOfEndpointDisplayValues(): EndpointDisplay[] {
        this.getContentsOfFiles();
        return this.simulators;
    }
}

export default ExistingEndpointsHandler;
