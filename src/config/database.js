module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  port: 5433,
  username: 'docker',
  password: 'docker',
  database: 'desafio02',
  operatorAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
