const { Model } = require('sequelize');
const db = require('./db');

const Categoria = db.sequelize.define('Categoria',{
    //atributos
    nome_categoria: {
        type: db.Sequelize.STRING,
    },
    usuario_id: {
        type: db.Sequelize.INTEGER,
        references:{
            model: 'Usuarios',
            key:'id'
        }
    },

    
});

module.exports = Categoria;