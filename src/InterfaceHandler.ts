import EndpointHandler from "./EndpointHandler";
import express, { Request, Response } from "express";
import * as path from "path";
import * as fs from "fs";
import GlobalConfigHandler from "./GlobalConfigHandler";
import ExistingEndpointsHandler from "./ExistingEndpointsHandler";

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

        app.post("/add_endpoint", (req, res) => {
            console.log(req.params);
            console.log(req.body);
            fs.writeFile(this.configDirectory + "test.config", JSON.stringify(req.body, null, 4), { flag: "w+" }, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
            res.send("{}");
        });

        app.get("/sendupthewholeocean", (req, res) => {
            let existingEndpoints = new ExistingEndpointsHandler(this.endpointDirectory);
            console.log(this.endpointDirectory);
            res.send(JSON.stringify(existingEndpoints.retrieveListOfEndpointDisplayValues()));
        });

        app.listen(this.interfacePort, () => {
            app.emit(`app started`);
            console.log(`Server is listening on port ${this.interfacePort}`);
        });
    }
}

export default InterfaceHandler;
