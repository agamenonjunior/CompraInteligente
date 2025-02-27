const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
//const Sequelize = require('sequelize');
const usuario = require('./models/Usuario');
const categoria = require('./models/Categoria');
const produto = require('./models/Produto');
const lista = require('./models/Lista');
const { where } = require('sequelize');
const { Where } = require('sequelize/lib/utils');

//const db = require('./models/db');

/**
 * configurando multer
 */

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './views/img')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }

});
//Responsavel pelo Upload
const upload = multer({ storage });

/**
 * Criando as tabelas
 */


//Cria a tabela
//Usuario_TB.sync({force:true});
usuario.sync();
categoria.sync();
produto.sync();
lista.sync();

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

app.post('/login', function (req, res) {
    
    usuario.findAll({
        where: {
            email: req.body.email,
            senha: req.body.senha,
            
        }
    }).then(function (user) {
        res.render('home', { user: user });
    });
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
        nome_categoria: req.body.nome_categoria,
    }

    categoria.update(dados, {
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
    produto.findAll({
        where: {
            usuario_id: 1
        }
    }).then(function (produtos) {

        res.render('produtos', { produtos: produtos });
    });
});
//Lista os Produtos Cadastrados
app.get('/cadastrar-produto', function (req, res) {
    categoria.findAll({
        where: {
            usuario_id: 1
        }
    }).then(function (categorias) {

        res.render('cadastrar-produto', { categorias: categorias });
    });



});
//FAZ O INSERT DE PRODUTO
app.post('/cadastrar-produto', upload.single('imagem_produto'), function (req, res, next) {
    const file = req.file
    if (!file) {
        const err = new Error('Por favor selecione um arquivo para imagem');
        err.httpStatusCode = 400;
        return next(err)
    }
    const imagem_produto = file.filename;
    //res.render('cadastrar-categoria');
    produto.create({
        nome_produto: req.body.nome_produto,
        quantidade_produto: req.body.quantidade_produto,
        imagem_produto: imagem_produto,
        categoria_produto: req.body.categoria_produto,
        usuario_id: 1
    }).then(function () {
        res.send('Produto cadastrado com sucesso ! <a href="/cadastrar-produto"> Voltar</a>');
        //res.redirect('/cadastrar-categoria/:sucesso')
    }).catch(function (error) {
        res.send('Ops..Error ao cadastrar!' + error);
    });

});

app.get('/editar-produto/:id', function (req, res) {
    produto.findAll({
        where: {
            id: req.params.id
        }
    }).then(function (produtos) {

        res.render('editar-produto', { produtos: produtos });
    });
});

app.get('/excluir-produto/:id', function (req, res) {
    produto.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.send('Produto Deletado com sucesso! <a href="/produtos"> Voltar</a>');
    }).catch(function (error) {
        res.send('Ops..Error ao deletar!' + error);
    });
});

app.get('/listas', function (req, res) {
    lista.findAll({
        where: {
            usuario_id: 1
        }
    }).then(function (listas) {

        res.render('listas', { listas: listas });
    });
});

app.get('/cadastrar-lista', function (req, res) {
    res.render('cadastrar-lista');
});

app.post('/cadastrar-lista', function (req, res) {
    //res.render('cadastrar-categoria');
    lista.create({
        nome_lista: req.body.nome_lista,
        usuario_id: 1
    }).then(function () {
        res.send('Lista cadastrada com sucesso ! <a href="/cadastrar-lista"> Voltar</a>');
        //res.redirect('/cadastrar-categoria/:sucesso')
    }).catch(function (error) {
        res.send('Ops..Error ao cadastrar!' + error);
    });


});

app.get('/adicionar-item', function (req, res) {
    lista.findAll({
        
    }).then(function (listas) {
        produto.findAll({

        }).then(function(produtos){
            res.render('adicionar-item', { listas: listas, produtos:produtos});

        });
    });
});
//Insert na Lista
app.post('/adicionar-item', function (req, res) {
   
    const produto = JSON.stringify(req.body.nome_produto)
    
    lista.create({
        nome_lista: req.body.nome_lista,
        nome_produto:produto,
        usuario_id: 1
    }).then(function () {
        res.send('Lista cadastrada com sucesso ! <a href="/listas"> Volta </a>');
        //res.redirect('/cadastrar-categoria/:sucesso')
    }).catch(function (error) {
        res.send('Ops..Error ao cadastrar!' + error);
    });
    
});

app.get('/editar-lista/:id', function (req, res) {
    lista.findAll({
        
    }).then(function (listas) {
        produto.findAll({

        }).then(function(produtos){
            res.render('adicionar-item', { listas: listas, produtos:produtos});

        });
    });
});

app.get('/excluir-lista/:id', function (req, res) {
    lista.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.send('Lista Deletada com sucesso! <a href="/listas"> Voltar</a>');
    }).catch(function (error) {
        res.send('Ops..Error ao deletar!' + error);
    });
});

app.get('/compartilhar-lista/:id', function (req, res) {
    link = req.body.id
    lista.findAll({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.send('Link para comparilhar a sua lista <a href="`link`">LINK</a>  -  <a href="/listas"> Voltar</a>');
    }).catch(function (error) {
        res.send('Ops..Error ao deletar!' + error);
    });
});







/***
 * abrindo navegador
 
 
const open = (process.platform == 'darwin'? 'open' : process.platform == 'win32'? 'start': 'xdg-open');
require('child_process').exec(open + ' '+ url);
 
*/

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

