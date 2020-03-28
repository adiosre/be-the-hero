const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
/*rota para listar todas as ongs cadastradas*/
    async index (request,response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

/*rota de cadastro de ongs*/
    async create (request, response){
    const {name, email, whatsapp, city, uf} = request.body;
 /* definindo que o id é igual a 4 bytes de caracteres hex aleátorios q serao convertidos em string */
    const id = crypto.randomBytes(4).toString('HEX');

 /* inserindo dados na tabela do banco*/
    await connection('ongs').insert({
     id,
     name,
     email,
     whatsapp,
     city,
     uf,
    })

    return response.json({id});
    }
};

