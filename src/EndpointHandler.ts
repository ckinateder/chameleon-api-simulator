import fs from "fs";
const path = require('path');

class EndpointHandler {
    endpoints: { [key: string]: Array<APIEndpointValue> } = {};

    constructor(path: string) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
    }

    private onConfigReadError(err: NodeJS.ErrnoException): void {
        console.error(err); //TODO: Better Error handling
    }

    private readAPIConfig(dirName: string, fileName: string): void {
        let fileContent: any;
        try {
            fileContent = JSON.parse(fs.readFileSync(dirName + path.sep + fileName, `utf-8`))
        }
        catch (err) {
            this.onConfigReadError(err);
            return;
        }
        const endpoint: string = Object.keys(fileContent)[0];
        const endpointValue: APIEndpointValue = {
            status: fileContent[endpoint].status,
            parameters: fileContent[endpoint].parameters,
            headers: fileContent[endpoint].headers,
            body: fileContent[endpoint].body,
        };
        if (this.endpoints.hasOwnProperty(endpoint)) {
            this.endpoints[endpoint].push(endpointValue);
        } else {
            this.endpoints[endpoint] = [endpointValue];
        }
    }

    private buildParameterTypeFromSearchParameter(parameterValues: Array<string>): Parameter {
        const parameter: Parameter = {
            name: parameterValues[0],
            required: null,
            value: parameterValues[1],
            type: null,
        };
        return parameter;
    }

    private seperateSearchParametersIntoParameterObjects(parametersString: string): Array<Parameter> {
        const searchParametersObject: Array<Parameter> = [];

        for (const parameter of parametersString.split(`&`)) {
            searchParametersObject.push(this.buildParameterTypeFromSearchParameter(parameter.split(`=`)));
        }

        return searchParametersObject;
    }

    private tryParseTheSearchParameter(searchParameterValue: string, storedParamterType: string): boolean {
        switch (storedParamterType) {
            case "number":
                if (!Number.isNaN(parseInt(searchParameterValue)))  {
                    parseInt(searchParameterValue);
                    break;
                } else {
                    return false;
                }
        }
        return true;
    }

    private compareParamterValues(searchParameter: Parameter, storedParameter: Parameter): boolean {
        if (searchParameter) {
            if (storedParameter.required && storedParameter.value != null) {
                if (storedParameter.value != searchParameter.value) {
                    return false; // The stored parameter is required and the values dont match
                }
            } else if (!storedParameter.required && storedParameter.value != null) {
                if (storedParameter.value != searchParameter.value){ return false }
                    
            } else {
                return this.tryParseTheSearchParameter(searchParameter.value, storedParameter.type)
            }
        } else {
            if (storedParameter.required) {
                return false;
            }
        }
        return true
    }

    private compareSearchParamtersToStoredParameters(searchParameters: Array<Parameter>, storedParameters: Array<Parameter>): boolean {
        if (searchParameters.length > 0) {
            for (const searchParameter of searchParameters) {
                const storedParameter: Parameter = storedParameters.find((parameter) => parameter.name === searchParameter.name);
                if (storedParameter === undefined || (!this.compareParamterValues(searchParameter, storedParameter))) {
                    return false;
                }
            }
        }
        else if (storedParameters.length != 0){
            return false
        }
        return true;
    }

    retrieveAPIConfigs(dirName: string): void {
        let fileNames: Array<string>;
        console.log(dirName)
        try {
            fileNames = fs.readdirSync(dirName);
        } catch (err) {
            this.onConfigReadError(err);
            return;
        }

        for (const fileName of fileNames) {
            this.readAPIConfig(dirName, fileName);
        }
    }

    matchURLParamters(searchParameters: string): APIEndpointValue {
        let searchParametersSeperated: Array<string>;
        let searchParamters: Array<Parameter>;
        
        if (searchParameters.includes(`?`)) {
            searchParametersSeperated = searchParameters.split(`?`);
            searchParamters = this.seperateSearchParametersIntoParameterObjects(searchParametersSeperated[1]);
        }
        else {
            searchParametersSeperated = [searchParameters];
            searchParamters = [];
        }

        // Find the endpoint dictionary object using the endpoint passed through the api call
        const matchedStoredEndpoint: Array<APIEndpointValue> = this.endpoints[searchParametersSeperated[0]];        

        if (matchedStoredEndpoint != undefined) {
            for (const storedEnpointValues of matchedStoredEndpoint) {
                // Compare search parameters to stored endpoint parameters
                if (this.compareSearchParamtersToStoredParameters(searchParamters, storedEnpointValues.parameters)) {
                    // If the search parameters match stored parameters, return the stored value
                    return storedEnpointValues;
                }
            }
            //TODO: If the search parameters dont match any stored parameters, handle it
        } else {
            console.error("The entered endpoint does not exist.");
        }
        return undefined;
    }
}

export default EndpointHandler;
