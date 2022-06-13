const path = require('path');

const config ={
    'port' : 3060,
    'host' : '127.0.0.1',
    'database' : path.join(__dirname,'TESTDB.FDB'),
    'user' : 'SYSDBA',
    'password' : 'masterkey',
    }

module.exports = config;