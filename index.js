import fetch from "node-fetch"
/**
 * @typedef {Object} Endpoint
 * EXAMPLE: { url: "http://localhost:8080", method: "GET", bodyJSON: { foo: "bar"}, headers: { "Content-Type": "application/json"}, typename: "FooResponse" }
 * @property {string} url
 * @property {string} method
 * @property {Object?} bodyJSON
 * @property {FormData?} formData
 * @property {*} headers
 * @property {string} typename
 * @property {boolean} export
 */




/**
 * @param {*} any any javascript value to get type information for
 * @returns {string} the string representation of the type information of 'any'
 * @about extends upon the 'typeof' builtin function to get more detailed type information
 * NOTE: for array types only the type of the first element is checked, if length is 0 'unknown' type is returned.
 */
export function get_type(any){
	const t = typeof any;
	if(t == "object"){
		if(Array.isArray(any)){
			const atype = any.length === 0 ? "unknown" : get_type(any[0]);
			return `${atype}[]`;
		}
		else { 
			const inner = [];
			let cursor = "{";
			for(const key in any)
				inner.push(`${key}:${get_type(any[key])}`);
		
			cursor += inner.join(` , `);
			cursor +="}";
			return cursor;
		}
	} else { //base case - is a 'primative' type
		return t
	}
}




export const TypeFormatters = { 
    jsdoc: (typename,templateObject) => `/**@typedef {${get_type(templateObject)}} ${typename} */`, 
    ts: (typename,templateObject) => `type ${typename} = ${get_type(templateObject)};`
}


/**
 * @param {"jsdoc"|"ts"} mode
 * @param {Endpoint[]} endpoints endpoints to test and generate response type information for 
 */
export async function tapi(mode,endpoints){
    const types = {} 
    for(let e = 0; e < endpoints.length; e++){
        let body, headers = endpoints[e].headers ; 
        try {
            if(endpoints[e].bodyJSON) {
                body = JSON.stringify(endpoints[e].bodyJSON)
                headers["Content-Type"] = "application/json"
            }
            else if (endpoints[e].formData) {
                body = endpoints[e].formData; 
                headers["Content-Type"] = "multipart/form-data"
            }
        } catch (error) {
            console.error("Failed to parse request body: ", error);
            return { error }
        }

        let res; 
        try {
            if(body){
                res = await fetch(endpoints[e].url, {
                    method: endpoints[e].method,
                    body, headers
                })
            } else { 
                res = await fetch(endpoints[e].url, {method: endpoints[e].method, headers});
            }
        } catch (error) {
            console.error(`Failed to fetch from endpoint:  ${endpoints[e].url}\nReason: `, error);
            return { error }
        }

        const templateData = await res.json()
        const tname = endpoints[e].typename
        if(typeof TypeFormatters[mode] === "function"){
           types[tname] =  TypeFormatters[mode](tname,templateData)
           if(mode === "ts" && endpoints[e].export){
            types[tname] = `export ${types[tname]}`
           }
        }
    }
    return types
}





