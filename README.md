# chameleon-api-simulator

## Config Files

### Global
  **File Name:** gconfig.json

  **Contents:** 
- Directory location of the Enpoint Config file
- Api host port
- Local host endpoint prefix

  **Example**
  ```json
  {
    "apiport": <port: number>,
    "endpoint": {
        "configpath": <file path: string>,
        "echobaseroute": <url prefix: string>
    }
  }
  ```
### Endpoint
  **File Name:** {configpath}\\{anything}.json

  **Contents:** 
  - Endpoint
    - Status
    - Headers
      - Name
      - Value
    - Parmeters
      - Name
      - Value
      - Type
      - Required?
    - Body
      - HTTP Request Type
  
  **Example**
  ```json
  {
    "/people": {
        "status": 200,
        "parameters": [
            {
                "name": "color",
                "required": true,
                "value": "blue",
                "type": "string"
            }
        ],
        "headers": [
            {
                "name": "Authorization",
                "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            },
            {
                "name": "Content-Type",
                "value": "application/json"
            },
            {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
        ],
        "body": {    
            "GET": {
                "data": [
                    {
                        "id": 1,
                        "name": "Eve",
                        "email": "eve@example.com",
                        "phone": "+1-555-555-5555",
                        "address": {
                            "street": "456 Main St",
                            "city": "Somewhere",
                            "state": "FL",
                            "zip": "13579"
                        }
                    },
                    {
                        "id": 2,
                        "name": "Frank",
                        "email": "frank@example.com",
                        "phone": "+1-555-555-5555",
                        "address": {
                            "street": "246 Park Ave",
                            "city": "Bigtown",
                            "state": "IL",
                            "zip": "97531"
                        }
                    },
                    {
                        "id": 3,
                        "name": "Grace",
                        "email": "grace@example.com",
                        "phone": "+1-555-555-5555",
                        "address": {
                            "street": "789 Oak St",
                            "city": "Smallville",
                            "state": "TX",
                            "zip": "54321"
                        }
                    }
                ]
            }
        }
    }
}

  ```
  
## Usage

### Install

```bash
npm install
```

### Run

```bash
npm start
```