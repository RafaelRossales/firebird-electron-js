const Firebird = require('node-firebird');
const path = require('path');
const Config = require('./config.js');

class DatabaseController{

    constructor()
    {}

    transcation(callback)
    {
        try{
            Firebird.attach(Config,callback)
        }catch(error){
            callback(error);
        }
    }
}

const db = new DatabaseController;

module.exports = db;