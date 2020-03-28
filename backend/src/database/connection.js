/*importando o knex */
const knex = require('knex');

/*importando as configurações do banco de dados no arquivo knewfile*/
const configuration = require('../../knexfile');

/*criando a conexão*/
const connection = knex(configuration.development);

/*exportando a conexão*/
module.exports = connection;