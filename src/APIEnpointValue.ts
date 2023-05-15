type APIEndpointValue = {
    parameters: Parameter[];
    response: {
        headers: Header[];
        status: number;
        body: string;
    };
    status: number;
}