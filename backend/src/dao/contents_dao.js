import db from '../infra/db.js';

class contents_dao{
    static list(){
        const query = 'select * from produtos';
        return new Promise((resolve, reject) => {
            db.all(query, (erro, rows) => {
                if (erro) {
                    reject(erro);
                }

                resolve(rows);
            });
        });
    };

    static insert(produtos){
        const query = 'insert into produtos (nome, marca_propria, descricao, preco) values (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [produtos.nome, produtos.marca_propria, produtos.descricao, produtos.preco], function (erro) {
                if (erro) {
                    reject({
                        msg: 'Erro',
                        error: erro
                    });
                };

                resolve({
                    msg: 'Inserido',
                    content_id: this.lastID
                 });
            });
        });
    };

    static delete(id){
        const query = 'delete from produtos where id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [id], (erro) => {
                if(erro){
                    reject({
                        msg: 'Erro',
                        error: erro
                    });
                };

                resolve({
                    msg: 'Criado',
                    content_id: this.lastID
                });
            });
        });
    };

    static update(id, produtos){
        const query = 'update produtos set nome = ?, marca_propria = ?, descricao = ?, preco = ? where id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [produtos.nome, produtos.marca_propria, produtos.descricao, produtos.preco, id], (erro) => {
                if(erro){
                    reject({
                        msg: 'Erro',
                        error: erro
                    });
                };

                resolve({
                    msg: 'Atualizado'
                });
            });
        });
    };
};

export default contents_dao;
