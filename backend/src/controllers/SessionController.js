const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        /*busca o id através do corpo da requisição - id da ong que está tentando fazer o login*/
        const { id } = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if (!ong){
            return response.status(400).json ({ error: 'no ONG found with this ID'});
        }

        return response.json(ong);

    }
}