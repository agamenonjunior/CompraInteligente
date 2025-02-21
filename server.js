const http = require("http")
const host = "127.0.0.1"
const port = 3000
const url  = `http://${host}:${port}/`
const server = http.createServer((req,res)=>{
res.statusCode =200;
res.setHeader('Content-Type','text/html');
res.end("<h1>Ola mundo primeiro script</h1>");
})


/***
 * abrindo navegador
 

const open = (process.platform == 'darwin'? 'open' : process.platform == 'win32'? 'start': 'xdg-open');
require('child_process').exec(open + ' '+ url);

*/

server.listen(port,host,()=>{
    console.log(`server runnig at http://${host}:${port}`)
});

