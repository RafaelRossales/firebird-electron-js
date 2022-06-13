
const { app, BrowserWindow, ipcMain } = require('electron');
const db = require('../db/DatabaseController');


class Transactions{

    constructor(currentWindow)
    {
        this.currentWindow = null;

        this.setCurrentWindow(currentWindow);
    }

    setCurrentWindow(value){
        this.currentWindow = value;
        return this;
    }

    getCurrentWindow(){
        return this.currentWindow;
    }

    init()
    {
        console.log('escutando...')

        ipcMain.on('load-data',this.load.bind(this))
        ipcMain.on('insert-data',this.insert.bind(this))
        ipcMain.on('delete-data',this.delete.bind(this))
        ipcMain.on('update-data',this.update.bind(this))

        return this;
    }


    load(event){

        try {
            
            let query =`SELECT * FROM PERSON;`;

            db.transcation(function(error,database){
    
                database.query(query,function(error,result){
    
                    event.sender.send('load-data',{'data':result});
    
                    // Fecha conexao com a base de dados
                    database.detach();
                })
            })

        } catch (error) {
            
            console.error(error)
        }
    }

    insert(event,data){

        const { name,email } = data;

        try {
            
            let query =`INSERT INTO PERSON (NAME) VALUES(?) RETURNING ID;`;

            db.transcation(function(error,database){
    
                database.query(query,[name],function(error,result){

                    event.sender.send('insert-data',{})

                    // Fecha conexao com a base de dados
                    database.detach();
                })
            })

        } catch (error) {
            
            console.error(error)
        }
    }

    update(event,data){

        const { id, name} = data;

        let query = `
        UPDATE PERSON
        set NAME =?
        WHERE ID=?
        RETURNING ID;
        `

        try{
            db.transcation(function(error,database){
    
                database.query(query,[name,id],function(error,result){

                    console.log('update',result)

                    event.sender.send('update-data',{})
                    // Fecha conexao com a base de dados
                    database.detach();
                })
            })
        }
        catch(error){
            console.log(error)
        }
    }


    delete(event,data){

        const { id } = data;

        try {
            
            let query =`DELETE FROM PERSON WHERE ID=? RETURNING ID;`;

            db.transcation(function(error,database){
    
                database.query(query,[id],function(error,result){

                    console.log(result)

                    event.sender.send('delete-data',{})
                    // Fecha conexao com a base de dados
                    database.detach();
                })
            })

        } catch (error) {
            
            console.error(error)
        }
    }
}


module.exports = Transactions;