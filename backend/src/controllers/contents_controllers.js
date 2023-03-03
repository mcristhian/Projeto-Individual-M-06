import contents_dao from '../dao/contents_dao.js';

class contents_controllers{
    static routes(app){
        app.get('/produtos', contents_controllers.list);
        app.post('/produtos', contents_controllers.insert);
        app.delete('/produtos/:id', contents_controllers.delete);
        app.put('/produtos/:id', contents_controllers.update);
    };

    static async list(req, res){
        const produtos = await contents_dao.list();
        res.send(produtos);
    };

    static async insert(req, res){
        const produtos = {
            nome: req.body.nome,
            marca_propria: req.body.marca_propria,
            descricao: req.body.descricao,
            preco: req.body.preco
        };

        const result = await contents_dao.insert(produtos);

        if(result.error){
            res.status(500).send(result);
        }

        res.send(result);
    };

    static async delete(req, res){
        const produtos = await contents_dao.delete(req.params.id);

        if(produtos.error){
            res.status(500).send('Erro');
        }

        res.send({msg: 'Removido'});
    };

    static async update(req, res){
        const produtos = {
            nome: req.body.nome,
            marca_propria: req.body.marca_propria,
            descricao: req.body.descricao,
            preco: req.body.preco
        };

        const result = await contents_dao.update(req.params.id, produtos);

        if(result.error){
            res.status(500).send('Erro');
        };

        res.send({
            msg: 'Alterado'
        });
    };
};

export default contents_controllers;
