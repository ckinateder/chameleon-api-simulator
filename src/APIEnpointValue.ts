type APIEndpointValue = {
    status: number;
    parameters: Parameter[];
    headers: Header[];
    responses: {[key: string]: string};  
}