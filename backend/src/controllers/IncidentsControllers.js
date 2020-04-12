const connection = require("../database/connection");

module.exports = {
    async list(request, response) {
        ong_id = request.headers.authorization;
        const { page = 1 } = request.query;

        const [count] = await connection('incidents')
            .where('ong_id', ong_id)
            .count();

        response.header('X-Total-Cont', count['count(*)']);

        const list = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'ong_id')
            .select('incidents.*', 'ongs.nome', 'ongs.email', 'ongs.whatsapp', 'ongs.cidade', 'ongs.uf')
            .where('incidents.ong_id', ong_id)
            .limit(5)
            .offset((page - 1) * 5);

        return response.json(list);
    },
    async listAll(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents')
            .count();

        response.header('X-Total-Cont', count['count(*)']);


        const list = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'ong_id')
            .select('incidents.*', 'ongs.nome', 'ongs.email', 'ongs.whatsapp', 'ongs.cidade', 'ongs.uf')
            .limit(5)
            .offset((page - 1) * 5);

        return response.json(list);
    },

    async create(request, response) {
        const { titulo, descricao, valor } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            titulo,
            descricao,
            valor,
            ong_id
        })

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id) //onde o id for igual ao do parametro
            .where('ong_id', ong_id)
            .first() //retornar só um

        if (!incident) {
            return response.status(401).json({ error: 'nao permitida' });
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
};
