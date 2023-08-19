type APIEndpointValue = {
    status: number;
    parameters: Parameter[];
    headers: Header[];
    body: { [key: string]: string };
};

type UnprocessedEndpointData = {
    name: string;
    endpoint: string;
    status: number;
    parameters: any[];
    headers: any[];
    body: { [key: string]: string };
};
