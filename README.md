# tapi 
---
**Automated Type Definitions**
- Uses JSON responses to generate TypeScript or JSdoc type definitions. 
- Create custom scripts with the library functions, or use the cli `tapi.js` 

### Features
* Define enpoints in a json file to use the cli 
* append type definitions to a file 
* copy paste type definitions from terminal output

---
## CLI Usage 
`node tapi.js <mode> <endpoints.json> [oFile]`
* `<mode>` -> `ts` | `jsdoc`
* `<endpoints.json>` -> a valid path to a json file containing a list of endpoints. 
* `[oFile]` -> optional; the file to output type definitions to, if not provided prints to stdout. 
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
Pass endpoints to `tapi(<mode>,endpoints)` to generate type information from the http responses. 
### **Properties** 
> **url : string**
* the http url to request (uses fetch api)

> **method : string**
* an http method verb such as GET or POST

> **bodyJSON?: Object**
* optional request body json 

> **formData?: FormData**
* optional form data 

> **headers: Object**
* the request headers

> **typename: string**
* what to name the type of the response object

> **export?:boolean**
* (optional) -> for typescript whether or not the type should be exported 
---
## Examples
There are some usage examples in the `examples/` directory for more information. 
