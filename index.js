const Firebird = require('node-firebird');
const path = require('path');

var options = {};

options.host = '127.0.0.1';
options.port = 3060;
options.database = path.join(__dirname,'TESTDB.FDB');
options.user = 'SYSDBA';
options.password = 'masterkey';


function init(){

    Firebird.attach(options, function(err, db) {

        if (err)
            throw err;
    
        // db = DATABASE
        db.query('SELECT * FROM PERSON', function(err, result) {

            console.log(result)
            // IMPORTANT: close the connection
            db.detach();
        });
    
    });

}

init()