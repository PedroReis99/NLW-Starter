const express = require("express");
const server = express();

//Pegar o banco de dados
const db = require("./database/db.js");

//Utilizando Template Engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true,//Não vai ter cache
});

//Configurar pasta publica
server.use(express.static("public"));

//Habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }));

//Configurar caminhos da minha aplicação

//Pagína inicial
server.get("/", (req, res) => {
    res.render("index.html", { title: "Seu marketplace de coleta de resíduos"});
});
//Pagina create-point
server.get("/create-point", (req, res) => {

    console.log(req.query);

    res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {//Salva os itens
    
    //Inserir dados no banco de dados
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
        req.body.image,    
        req.body.name,    
        req.body.address,    
        req.body.address2,    
        req.body.state,    
        req.body.city,    
        req.body.items    
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err + " \n Erro no cadastro!");
        }
        res.render("create-point.html", { saved: true });
    }

    db.run(query, values, afterInsertData);
});

//Pagina de resultados de pesquisa
server.get("/search-results", (req, res) => {
    const search = req.query.search; 

    if(search == ""){
        //Pesquisa vazia
        const total = rows.length

        res.render(__dirname + "/views/search-results.html", { total: 0});
    }

    //Pegar os dados do Banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'` , function(err, rows){
        if(err){
            return console.log(err);
        }

        const total = rows.length

        res.render(__dirname + "/views/search-results.html", { places: rows, total});
    });
});

//ligar o servidor
server.listen(3000);