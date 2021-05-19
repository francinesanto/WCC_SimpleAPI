const configExpress = require('./config/configExpress');

app = configExpress()
// subir aplicação-porta comum no node 3000
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));


