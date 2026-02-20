fs = require('fs');
http = require('http');



const overviewtemp = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8");
const productcardtemp = fs.readFileSync(`${__dirname}/templates/productcard.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataobj = JSON.parse(data);


const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%productName%}/g, product.productName);
    output = output.replace(/{%image%}/g, product.image);
    output = output.replace(/{%price%}/g, product.price);
    // output = output.replace(/{%FROM%}/g, product.from);
    // output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%quantity%}/g, product.quantity);
    // output = output.replace(/{%DESCRIPTION%}/g, product.description);
    // output = output.replace(/{%ID%}/g, product.id);
    return output;
}



const server = http.createServer((req, res) => {
    // res.end("hello from server")
    // console.log(req.url);
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        
        const cardshtml = dataobj.map(el => replaceTemplate(productcardtemp,el)).join("");
        
        const output = overviewtemp.replace("{%productcard%}", cardshtml)
        
        res.end(output)
    }
    
});

server.listen(3000, () => {
    console.log("server is running on port 3000")

})  ;    