
module.exports = {
  development: {
    port: 5432,
    host: 'localhost',
    database: 'identity',
    username: 'postgres',
    password: 'postgres',
    dialect: 'postgres'
  },
  production: {
    port: 5432,
    host: 'db',
    database: 'identity',
    username: 'admin',
    password: '1Ctdfcnjgjkm',
    dialect: 'postgres'
  }
};