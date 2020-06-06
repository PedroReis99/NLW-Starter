//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//Criar o objeto que ira fazer operações no Banco de Dados

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

//utilizar objeto de banco de dados para nossas operações

/* db.serialize(() => {//Com comandos SQL
    //1- criar uma tabela| 
    db.run(`
        CREATE TABLE IF NOT EXISTS  places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    //2- Inserir dados na tabela
    const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES ( ?, ?, ?, ?, ?, ?, ? );
        `;

    const values = [
        "http://localhost:3000/imagemTmp/papersider.jpg",
        "PapersiderColetoria",
        "Guilherme Gemballa, Jardim América",
        "Rio do sul",
        "SC",
        "Rio do Sul",
        "Papéis e Papelão"]

    function afterInsertData(err){
        if(err){
            return console.log(err);
        }
        console.log("Cadastrado com sucesso!");
        console.log(this);
    }

    db.run(query, values, afterInsertData);
    //3- Consultar dados da tabela
    db.all(`SELECT * FROM places` , function(err, rows){
        if(err){
            return console.log(err);
        }
        console.log("Seus Registros");
        console.log(rows);
    });
    //4- Deletar dados da tabela
    db.run(`DELETE FROM places WHERE ?`, [1]);
    console.log("deletado") 
})*/