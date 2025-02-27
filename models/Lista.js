const { Model } = require('sequelize');
const db = require('./db');

const Lista = db.sequelize.define('Listas',{
    //atributos
    nome_lista: {
        type: db.Sequelize.STRING,
    },
    nome_produto: {
        type: db.Sequelize.STRING,
    },
    imagem_produto: {
        type: db.Sequelize.STRING,
    },
    categoria_produto: {
        type: db.Sequelize.STRING,
        
    },
    quantidade_produto: {
        type: db.Sequelize.INTEGER,
        
    },
    usuario_id: {
        type: db.Sequelize.INTEGER,
    },




});

module.exports = Lista;