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

    private buildParameters(rawParameters: any[]): Parameter[] {
        return rawParameters.map((rawParamter) => {
            name: rawParamter.name,
            require: rawParamter.required === 'true',
            value: rawParamter
        })
    }

    getEndpointData(fileName: string) {
        const filePath = this.dirname + path.sep + fileName;
        let response: Result;

        if (fs.existsSync(filePath)) {
            const fileContent: any = JSON.parse(fs.readFileSync(filePath, "utf-8"));
            const endpoint: string = Object.keys(fileContent)[0];
            const body: UnprocessedEndpointData = {
                name: fileName.split(".")[0],
                endpoint: endpoint,
                status: fileContent[endpoint].status,
                parameters: this.buildParameters (fileContent[endpoint].parameters)
                headers: this.buildHeaders(fileContent[endpoint])

            };
        }
    }

    editEndpoint(fileName: string, recievedEndpointString: string) {
        const filePath = this.dirname + path.sep + fileName;
        const newEndpoint = new NewEndpointsHandler(this.dirname);
        let response: Result;

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            newEndpoint.createNewEndpointFile(recievedEndpointString);
            response = {
                result: "success",
                code: 200,
                message: `Endpoint ${fileName} created successfully`,
            };
        } else {
            response = {
                result: "error",
                code: 400,
                message: `Endpoint ${fileName} does not exist`,
            };
        }
    }
}

export default EditEndpointsHandler;
