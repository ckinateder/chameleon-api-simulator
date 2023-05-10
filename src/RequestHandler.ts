import EndpointHandler from "./EndpointHandler";
import express from "express";
import GlobalConfigHandler from "./GlobalConfigHandler";

const app = express();

class RequestHandler {
    
    private echoBaseRoute: string;
    private apiPort: number;
    private response: any;
    private searchUrlPrefix: string;
    private endpointRetrievals: EndpointHandler;

    constructor(globalConfig: GlobalConfigHandler) {
        this.apiPort = globalConfig.port;
        this.echoBaseRoute = globalConfig.echoBaseRoute;
        this.searchUrlPrefix = globalConfig.apiBaseRoute
        this.endpointRetrievals = new EndpointHandler(globalConfig.endpointConfigPath);
        this.response = null;
        this.endpointRetrievals.retrieveAPIConfigs(globalConfig.endpointConfigPath);
    }

    runRequest() {
        
        app.all("*", ((req, res, next) => {
            const sentBaseUrl: string = req.originalUrl.slice(0,this.echoBaseRoute.length);
            if (sentBaseUrl === this.echoBaseRoute) {
                const searchUrl = this.searchUrlPrefix + req.originalUrl.slice(this.echoBaseRoute.length);
                this.response = this.endpointRetrievals.matchURLParamters(searchUrl);
                res.send(this.response)
            }

        }).bind(this));

        app.listen(this.apiPort, () => {
            app.emit(`app started`);
            console.log(`Server is listening on port ${this.apiPort}`)
        })
    }




}

export default RequestHandler;