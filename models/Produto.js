const { Model } = require('sequelize');
const db = require('./db');

const Produto = db.sequelize.define('Produtos',{
    //atributos
    nome_produto: {
        type: db.Sequelize.STRING,
    },
    quantidade_produto: {
        type: db.Sequelize.INTEGER,
    },
    imagem_produto: {
        type: db.Sequelize.STRING,
    },
    categoria_produto: {
        type: db.Sequelize.STRING,
        
    },
    usuario_id: {
        type: db.Sequelize.INTEGER,
    },




});

module.exports = Produto;