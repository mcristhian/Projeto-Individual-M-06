import app from './app.js';
import db from './infra/db.js';
import './infra/contents.js';

const port = 3000;

app.listen(port, () => {
    db.run('delete from produtos');

    console.log(`Servidor rodando na porta ${port}`);
});
