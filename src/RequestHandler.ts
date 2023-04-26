import EndpointHandler from "./EndpointHandler";
import express from "express";

const app = express();

class RequestHandler {
    
    private baseRoute: string;
    private apiPort: number;
    private response: any;
    private searchUrlPrefix: string;
    private endpointRetrievals: EndpointHandler;

    constructor(port: number, route: string, configDirectory: string, urlPrefix: string) {
        this.apiPort = port;
        this.baseRoute = route;
        this.searchUrlPrefix = urlPrefix
        this.endpointRetrievals = new EndpointHandler();
        this.response = null;
        this.endpointRetrievals.retrieveAPIConfigs(configDirectory);
    }

    runRequest() {
        
        app.all("*", ((req, res, next) => {
            console.log(this)
            const sentBaseUrl: string = req.originalUrl.slice(0,this.baseRoute.length);
            if (sentBaseUrl === this.baseRoute) {
                const searchUrl = this.searchUrlPrefix + req.originalUrl.slice(this.baseRoute.length);
                console.log(searchUrl);
                this.response = this.endpointRetrievals.matchURLParamters(searchUrl).response;
                res.send(this.response)
            }

        }).bind(this));
/*
        app.get(this.baseRoute , (req, res) => {
            console.log(req)
            const UrlSplit: Array<string> = req.originalUrl.split('/');
            const searchUrl: string = this.searchUrlPrefix + UrlSplit[UrlSplit.length - 1]
            this.response = this.endpointRetrievals.matchURLParamters(searchUrl).response;
            res.send(this.response)
        });
*/
        app.listen(this.apiPort, () => {
            app.emit(`app started`);
            console.log(`Server is listening on port ${this.apiPort}`)
        })
    }




}

export default RequestHandler;