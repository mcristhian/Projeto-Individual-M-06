import db from './db.js';

const table = `
create table if not exists "produtos" (
    "id" integer primary key,
    "nome" text,
    "marca_propria" text,
    "descricao" text,
    "preco" real
);
`;

function create_table(){
    db.run(table);
}

db.serialize(() => {
    create_table();
})
