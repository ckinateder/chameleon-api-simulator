import fs from "fs";
const path = require("path");

class NewEndpointsHandler {
    private dirname: string;
    private newEndpointRecieved: any;

    constructor(path: string) {
        this.dirname = path;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
    }

    createNewEndpointFile(recievedEndpointString: any) {
        const newEndpointRecieved = recievedEndpointString;
        const filePath: any = `${this.dirname + path.sep + newEndpointRecieved.name}.json`;
        const endpoint: any = newEndpointRecieved.endpoint;
        const status: any = newEndpointRecieved.status;
        const parameters: any[] = newEndpointRecieved.parameters;
        const headers: any[] = newEndpointRecieved.headers;
        const body: any = newEndpointRecieved.body;
        let response: Result;

        if (fs.existsSync(filePath)) {
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
            fs.writeFileSync(filePath, JSON.stringify(fileContents), `utf-8`);

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
