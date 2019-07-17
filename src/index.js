const server = require('./server');
require('dotenv').config();

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor rodando http://localhost:${port}`);
});
