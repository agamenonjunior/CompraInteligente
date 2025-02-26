const Sequelize = require("sequelize");

const DB = 'compraInteligente';
const User_DB = 'root';
const Pass_DB = '';
const sequelize = new Sequelize(DB,User_DB,Pass_DB,{
    host:'localhost',
    dialect:'mysql'
});

/**
 * Realizando a conexao com o Banco de dados
 */
sequelize.authenticate().then(function(){

console.log('conexao realiza com sucesso');
}).catch(function(err){
    console.log('Error na conexao '+err);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}