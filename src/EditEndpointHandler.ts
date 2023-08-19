import fs from "fs";
import NewEndpointsHandler from "./NewEndpointHandler";
const path = require("path");

class EditEndpointsHandler {
    private dirname: string;

    constructor(path: string) {
        if (fs.existsSync(path)) {
            this.dirname = path;
        }
    }

    getEndpointData(fileName: string) {
        const filePath = this.dirname + path.sep + fileName + ".json";
        let response: Result;

        if (fs.existsSync(filePath)) {
            const fileContent: any = JSON.parse(fs.readFileSync(filePath, "utf-8"));
            const endpoint: string = Object.keys(fileContent)[0];
            const body: UnprocessedEndpointData = {
                name: fileName.split(".")[0],
                endpoint: endpoint,
                status: fileContent[endpoint].status,
                parameters: fileContent[endpoint].parameters,
                headers: fileContent[endpoint].headers,
                body: fileContent[endpoint].body,
            };
            response = {
                result: "success",
                code: 200,
                message: JSON.stringify(body),
            };
        } else {
            response = {
                result: "error",
                code: 400,
                message: `Endpoint ${fileName} does not exist`,
            };
        }
        return response;
    }

    editEndpoint(fileName: string, recievedEndpointString: string) {
        const filePath = this.dirname + path.sep + fileName + ".json";
        const newEndpoint = new NewEndpointsHandler(this.dirname);
        let response: Result;

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            newEndpoint.createNewEndpointFile(recievedEndpointString);
            response = {
                result: "success",
                code: 200,
                message: `Endpoint ${fileName} edited successfully`,
            };
        } else {
            response = {
                result: "error",
                code: 400,
                message: `Endpoint ${fileName} does not exist`,
            };
        }
        return response;
    }
}

export default EditEndpointsHandler;
