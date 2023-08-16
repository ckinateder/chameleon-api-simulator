import fs, { readdirSync } from "fs";
const path = require("path");

class ExistingEndpointsHandler {
    dirname: string;

    constructor(path: string) {
        if (fs.existsSync(path)) {
            this.dirname = path;
        }
    }

    deleteFile(fileName: string) {
        let response: Result;
        const filePath: string = this.dirname + path.sep + fileName + `.json`;

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            response = {
                result: "success",
                code: 200,
                message: "File Deleted Successfully",
            };
        } else {
            response = {
                result: "error",
                code: 400,
                message: `File ${fileName} Doesn't Exist`,
            };
        }

        return response;
    }
}

export default ExistingEndpointsHandler;
