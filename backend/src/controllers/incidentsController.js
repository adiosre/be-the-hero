const connection = require('../database/connection');

module.exports = {
    async index (request, response){
        const { page = 1} = request.query;  

        const [count] = await connection('incidents')
        .count();
        

        console.log(count);

        const incidents = await connection('incidents')
        /* limite a 5 caso,
        pular 5 limites por pagina
        isso vai fazer pular os 5 primeiros registros e pegar os próximos
        Criando esquema de páginação 
        */
        .join('ongs','ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf']);

        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents);
    },

    async create(request,response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

       const [id] = await  connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json ({ id });
    },

    async delete (request, response){
 
         const { id } = request.params;
         const ong_id = request.headers.authorization;

        /* buscando o incidente na tabela, especificando o incidente, seleciono uma coluna especifica e retornando apenas 1 registro*/
         const incidents = await connection ('incidents')
            .where ('id', id)
            .select('ong_id')
            .first();

     /* verificar se o se a ong que está pedindo para deletar o incidente foi a responsavel pela criação
        senão, o delete é vetado. a ong pode deletar o incidente de outra ong*/  

        if (incidents.ong_id != ong_id) {
            return response.status(401).json ({ error: 'not today satan'});
        } 
            await connection('incidents').where('id', id).delete();

            /*retornando resposta para o front end sem conteudo - 204 */
            return response.status(204).send();
         
    }

};