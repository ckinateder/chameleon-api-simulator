import fs from "fs";
const path = require("path");

class NewEndpointsHandler {
    dirname: string;
    newEndpointRecieved: any;

    constructor(path: string, recievedEndpointString: string) {
        this.newEndpointRecieved = recievedEndpointString;
        this.dirname = path;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
    }

    createNewEndpointFile() {
        const filename: any = `${this.dirname + path.sep + this.newEndpointRecieved.name}.json`;
        const endpoint: any = this.newEndpointRecieved.endpoint;
        const status: any = this.newEndpointRecieved.status;
        const parameters: any[] = this.newEndpointRecieved.parameters;
        const headers: any[] = this.newEndpointRecieved.headers;
        const body: any = this.newEndpointRecieved.body;
        let response: Result;

        if (fs.existsSync(filename)) {
            response = {
                result: "error",
                code: 400,
                message: "Endpoint Name Already Exists",
            };
        } else {
            const fileContents: any = {};
            fileContents[endpoint] = {
                satus: status,
                parameters: parameters,
                headers: headers,
                body: body,
            };
            fs.writeFileSync(filename, JSON.stringify(fileContents), `utf-8`);

            response = {
                result: "success",
                code: 200,
                message: "File Created Successfully",
            };
        }

        return response;
    }
}

export default NewEndpointsHandler;
