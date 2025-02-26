const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const Sequelize = require('sequelize');
const usuario = require('./models/Usuario');
const categoria = require('./models/Categoria');
const produto = require('./models/Produto');
const { where } = require('sequelize');
const { Where } = require('sequelize/lib/utils');

//const db = require('./models/db');



/**
 * Criando as tabelas
 */


//Cria a tabela
//Usuario_TB.sync({force:true});
usuario.sync();
categoria.sync();
produto.sync();

/**Inserindo registro

Usuario_TB.create({
    nome: "Agamenon",
    email:"agamenon_junior1@hotmail.com",
    senha: 123456
});
**/

const port = 3000;

app.use(express.static('./views'));

/***
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
* 
*/

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));





/***
 * Get Home
 */
app.get('/', function (req, res) {
    res.render('index');
});


app.get('/cadastro', function (req, res) {
    res.render('cadastro');
});

app.post('/cadastro', function (req, res) {
    //Realiza o cadastro do Usuario no sistema
    //res.send("Valor do Form" + req.body.nome+ "</br>"+req.body.email+ "</br>"+req.body.senha);
    usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
    }).then(function () {
        res.send('Usuário cadastrado com sucesso !');
    }).catch(function (error) {
        res.send('Ops..Error ao cadastrar!' + error);
    });
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/home', function (req, res) {
    res.render('home');
});

app.get('/categorias', function (req, res) {
    categoria.findAll({
        where: {
            usuario_id: 1
        }
    }).then(function (categorias) {

        res.render('categorias', { categorias: categorias });
    });

});

app.get('/cadastrar-categoria', function (req, res) {
    res.render('cadastrar-categoria');
});

app.post('/cadastrar-categoria', function (req, res) {
    //res.render('cadastrar-categoria');
    categoria.create({
        nome_categoria: req.body.nome_categoria,
        usuario_id: 1
    }).then(function () {
        res.send('Categoria cadastrada com sucesso ! <a href="/cadastrar-categoria"> Voltar</a>');
        //res.redirect('/cadastrar-categoria/:sucesso')
    }).catch(function (error) {
        res.send('Ops..Error ao cadastrar!' + error);
    });


});

app.get('/editar-categoria', function (req, res) {
    res.render('editar-categoria');
});

app.get('/editar-categoria/:id', function (req, res) {
    categoria.findAll({
        where: {
            id: req.params.id
        }
    }).then(function (cat) {

        res.render('editar-categoria', { cat: cat });
    });
});

app.post('/editar-categoria/:id', function (req, res) {
    const id_categoria = req.body.id_categoria;
    const dados = {
        nome_categoria : req.body.nome_categoria,
    }
     
    categoria.update(dados,{
        where: {
            id: id_categoria
        }
    }).then(function () {
        res.send('Categoria editada com sucesso! <a href="/categorias"> Voltar</a>');
 
    });
});


    app.get('/excluir-categoria', function (req, res) {
        res.render('excluir-categoria');
    });

    app.get('/excluir-categoria/:id', function (req, res) {
        categoria.destroy({
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.send('Categoria apagada com sucesso! <a href="/categorias"> Voltar</a>');
        }).catch(function (error) {
            res.send('Ops..Error ao deletar!' + error);
        });
    });


    app.get('/produtos', function (req, res) {
        res.render('produtos');
    });

    app.get('/cadastrar-produto', function (req, res) {
        res.render('cadastrar-produto');
    });
    //FAZ O INSERT DE PRODUTO
    app.post('/cadastrar-produto', function (req, res) {
        
        //res.render('cadastrar-categoria');
    categoria.create({
        nome_produto: req.body.nome_produto,
        quantidade_produto: req.body.quantidade_produto,
        imagem_produto	: req.body.imagem_produto,
        usuario_id: 1
    }).then(function () {
        res.send('Produto cadastrado com sucesso ! <a href="/cadastrar-produto"> Voltar</a>');
        //res.redirect('/cadastrar-categoria/:sucesso')
    }).catch(function (error) {
        res.send('Ops..Error ao cadastrar!' + error);
    });

    });

    app.get('/editar-produto', function (req, res) {
        res.render('editar-produto');
    });

    app.get('/excluir-produto', function (req, res) {
        res.render('excluir-produto');
    });

    app.get('/listas', function (req, res) {
        res.render('listas');
    });

    app.get('/cadastrar-lista', function (req, res) {
        res.render('cadastrar-lista');
    });

    app.get('/editar-lista', function (req, res) {
        res.render('editar-lista');
    });

    app.get('/excluir-lista', function (req, res) {
        res.render('excluir-lista');
    });






    /***
     * abrindo navegador
     
    
    const open = (process.platform == 'darwin'? 'open' : process.platform == 'win32'? 'start': 'xdg-open');
    require('child_process').exec(open + ' '+ url);
    
    */

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });

