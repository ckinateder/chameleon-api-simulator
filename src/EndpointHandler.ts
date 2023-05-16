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
        let content: any;
        try {
            content = JSON.parse(fs.readFileSync(dirName + path.sep + fileName, `utf-8`))
        }
        catch (err) {
            this.onConfigReadError(err);
            return;
        }
        const endpoint: string = Object.keys(content)[0];
        const endpointValue: APIEndpointValue = {
            status: content[endpoint].status,
            parameters: content[endpoint].parameters,
            headers: content[endpoint].headers,
            response: content[endpoint].response,
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
            type: "any",
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
            case "int":
                try {
                    parseInt(searchParameterValue);
                    break;
                } catch (err) {
                    return false;
                }
            case "float":
                try {
                    parseFloat(searchParameterValue);
                    break;
                } catch (err) {
                    return false;
                }
            default:
                break;
        }
        return true;
    }

    private compareParamterValues(searchParameter: Parameter, storedParameter: Parameter): boolean {
        if (searchParameter) {
            if (storedParameter.required && storedParameter.value != searchParameter.value && storedParameter.value != "") {
                return false; // The stored parameter is required and the values dont match
            } else if (!storedParameter.required && storedParameter.value != searchParameter.value && storedParameter.value != "") {
                return false;
            }
        } else {
            if (storedParameter.required) {
                return false;
            }
        }
        console.log("whats up")
        return this.tryParseTheSearchParameter(searchParameter.value, storedParameter.type);
    }

    private compareSearchParamtersToStoredParameters(searchParameters: Array<Parameter>, storedParameters: Array<Parameter>): boolean {
        for (const storedParameter of storedParameters) {
            const searchParameter: Parameter = searchParameters.find((parameter) => parameter.name === storedParameter.name);
            if (!this.compareParamterValues(searchParameter, storedParameter)) {
                return false;
            }
        }
        return true;
    }

    retrieveAPIConfigs(dirName: string): void {
        let fileNames: Array<string>;
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
        let matchedConfig: APIEndpointValue;
        const searchParametersSeperated: Array<string> = searchParameters.split(`?`);

        // Find the endpoint dictionary object using the endpoint passed through the api call
        const matchedStoredEndpoint: Array<APIEndpointValue> = this.endpoints[searchParametersSeperated[0]];

        // Build parameter object from the parameters passed through the api call
        // This will be used to compare against stored parameters in our endpoint list
        const searchParamters: Array<Parameter> = this.seperateSearchParametersIntoParameterObjects(searchParametersSeperated[1]);

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
