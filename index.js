const express = require('express');
const app = express()
const port = 3000;
app.use(express.static('./views'));


app.set('view engine', 'ejs');
app.set('views', './views');
/***
 * Get Home
 */
app.get('/',function(req,res){
    res.render('index');
});


app.get('/cadastro',function(req,res){
    res.render('cadastro');
});

app.get('/login',function(req,res){
    res.render('login');
});




/***
 * abrindo navegador
 

const open = (process.platform == 'darwin'? 'open' : process.platform == 'win32'? 'start': 'xdg-open');
require('child_process').exec(open + ' '+ url);

*/

app.listen(port,() => {
    console.log(`Servidor rodando na porta ${port}`);
});

