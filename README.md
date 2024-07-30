# tapi 
---
**JSDOC Type Definitions from JSON api responses**
Capable of determining Javascript/TypeScript types based on JSON responses from given endpoints.  

## Usage 
`node tapi.js <mode> <endpoints.json> [oFile]`
* `<mode>` -> `ts` | `jsdoc`
* `<endpoints.json>` -> a valid path to a json file containing a list of endpoints. 
* `[oFile]` -> optional; the file to output type definitions to, if not provided prints to stdout. 



---
## Features
* Define enpoints in a json file to use the cli 
    * append type definitions to a file 
    * copy paste type definitions from terminal output

* Use the NodeJS library for more customizable endpoints. 
---

## Scripts 
use `npm run <script_name>`
1. `examples-all` - runs all examples
2. `example-get-type` - runs the get type example
3. `example-tapi` - runs an example of determining the type definitions from multiple endpoints. 
4. `example-cli-js` - runs an example usage of the CLI to generate jsdoc to a file
5. `example-cli-ts` - runs example usage of the CLI to generate ts types to a file. 
6. `clean` - clears any example generated files
---

## Endpoint 
**Properties** 
> url : string
the http endpoint to request (uses fetch api)

> method : string ["get","put" | "post | "delete",...] 
an http method verb such as GET or POST

> bodyJSON?: Object 
optional request body json 

> formData?: FormData
optional form data 

> headers: Object
the request headers

> typename: string
what to name the type of the response object

> export?:boolean
(optional) -> for typescript whether or not the type should be exported 
----

## Examples
There are some usage examples in the `examples/` directory for more information. 
