import EndpointHandler from "./EndpointHandler";
import express, { Request, Response } from "express";
import * as path from "path";
import * as fs from "fs";
import GlobalConfigHandler from "./GlobalConfigHandler";
import ExistingEndpointsHandler from "./ExistingEndpointsHandler";
import NewEndpointsHandler from "./NewEndpointHandler";

const app = express();

class InterfaceHandler {
    private interfacePort: number;
    private baseRoute: string;
    private searchUrlPrefix: string;
    private configDirectory: string;
    private endpointDirectory: string;

    constructor(globalConfig: GlobalConfigHandler) {
        this.interfacePort = globalConfig.interfacePort;
        this.baseRoute = globalConfig.echoBaseRoute;
        this.searchUrlPrefix = globalConfig.apiBaseRoute;
        this.configDirectory = globalConfig.endpointConfigPath;
        this.endpointDirectory = globalConfig.endpointDirectory;
    }

    runRequest() {
        app.use(express.json());

        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "/assets/index.html"));
        });

        app.post("/new_endpoint", (req, res) => {
            let newEndpoint: any = new NewEndpointsHandler(this.endpointDirectory, req.body);
            let response: Result = newEndpoint.createNewEndpointFile();
            res.status(response.code).send(response.message);
        });

        app.get("/view_endpoints", (req, res) => {
            let existingEndpoints = new ExistingEndpointsHandler(this.endpointDirectory);
            res.send(JSON.stringify(existingEndpoints.retrieveListOfEndpointDisplayValues()));
        });

        app.listen(this.interfacePort, () => {
            app.emit(`app started`);
            console.log(`Server is listening on port ${this.interfacePort}`);
        });
    }
}

export default InterfaceHandler;
