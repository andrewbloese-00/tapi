import { tapi } from "../index.js";
async function main(){
    const result = await tapi('jsdoc',[
        {
            typename: "dummy",
            url: "http://dummyjson.com/test",
            method: "GET",
        },
        {
            typename: "Product",
            url: "http://dummyjson.com/test",
            method: "GET",
        },
        {
            typename: "Recipe",
            url: "http://dummyjson.com/recipes",
            method: "GET",
        }
    ]);
    console.log([result.dummy,result.Product, result.Recipe].join("\n\n"));


}
main()
