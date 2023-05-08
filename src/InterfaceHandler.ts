import EndpointHandler from "./EndpointHandler";
import express from "express";
import * as path from 'path';
import * as fs from 'fs';

const app = express();

class InterfaceHandler {
    
    private apiPort: number;
    private baseRoute: string;
    private searchUrlPrefix: string;
    private configDirectory: string;

    constructor(port: number, route: string, configDirectory: string, urlPrefix: string) {
        this.apiPort = port;
        this.baseRoute = route;
        this.searchUrlPrefix = urlPrefix
        this.configDirectory = configDirectory;
    }

    runRequest() {

        app.use(express.json());
        
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '/assets/index.html'));
        });

        app.post('/add_endpoint', (req, res) => {
            console.log(req.params);
            console.log(req.body);
            fs.writeFile(this.configDirectory + "test.config", JSON.stringify(req.body, null, 4), { flag: 'w+' }, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
            res.send("{}");
        });

        app.listen(this.apiPort, () => {
            app.emit(`app started`);
            console.log(`Server is listening on port ${this.apiPort}`)
        })
    }

}

export default InterfaceHandler;