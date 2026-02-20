fs = require("fs");
http = require("http");
const url = require("url");

const overviewtemp = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8",
);
const details = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
const productcardtemp = fs.readFileSync(
  `${__dirname}/templates/productcard.html`,
  "utf-8",
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataobj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%productName%}/g, product.productName);
  output = output.replace(/{%image%}/g, product.image);
  output = output.replace(/{%price%}/g, product.price);
  output = output.replace(/{%from%}/g, product.from);
  output = output.replace(/{%nutrients%}/g, product.nutrients);
  output = output.replace(/{%quantity%}/g, product.quantity);
  output = output.replace(/{%description%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  return output;
};

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const cardshtml = dataobj
      .map((el) => replaceTemplate(productcardtemp, el))
      .join("");

    const output = overviewtemp.replace("{%productcard%}", cardshtml);

    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const id = query.id;
    const product = dataobj[id];
    const html = replaceTemplate(details, product);
    // console.log(html);

    res.end(html);
  }

  //not found page
  else {
    res.end("page not found");
  }
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
