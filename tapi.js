import fs from 'fs'
import { tapi } from './index.js';

// Command line arguments
const [ mode , pathToEndpoints, oFile ] = process.argv.slice(2);


//exit with error status & message
const FATAL_ERROR = ( message ) => { 
    process.stderr.write(`[tapi] error: ${message}`)
    process.exit(1)
}


//validate args
if(mode != "jsdoc" && mode != "ts")
    FATAL_ERROR(`unsupported mode "${mode}"\nExpected: "jsdoc" | "ts"`);


if(!pathToEndpoints) 
    FATAL_ERROR(`invalid usage: expected node tapi.js <mode> <path_to_endpoints.json> [oFile]`)



//helper, attempts to read endpoints json definitions, exits on failure
async function readEndpoints(){
    try {
        const json = await fs.promises.readFile(pathToEndpoints, "utf8");        
        const obj = JSON.parse(json)
        return obj;
    } catch (error) {
        FATAL_ERROR(`failed to read endpoints json from "${pathToEndpoints}"\nReason: ${error.message||error}`)
    }
}


/** 
* @about parses endpoints json, generates type definitions in jsdoc or ts, and writes to output file or stdout
*/
async function main(){
    const endpoints = await readEndpoints();
    const types = await tapi(mode,endpoints);    
    try {
        let output = "", n = 0
        for(const type in types){
            output += `${types[type]}\n\n`
            n++;
        }
        if(oFile){
            await fs.promises.appendFile(oFile, output,"utf8");
            process.stdout.write(`[tapi] success: wrote ${n} type definitions to ${oFile}`);
        } else { 
            process.stdout.write(`${output}\n\n[tapi] success: wrote ${n} type definitions to stdout`);
        }
        
    } catch (error) {
        FATAL_ERROR(`could not write type definitions\nreason: ${error.message||error}`)
    }













}
main();













