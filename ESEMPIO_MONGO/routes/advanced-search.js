var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;

//Ricerca un film in base a un attore
router.get('/actors/:a', function (req, res, next) {
    console.log(req.params); 
    a = req.params.a;
    const uri = 'mongodb+srv://ricardorodriguez:Rcy_kj0_p@nraboy-sample.bf8zs.mongodb.net/nraboy-sample?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies"); //connessione collection movies
        // eseguo una find sulla collection
        collection.find({cast:{$in : [`${a}`]}}).toArray((err, result) => {   //controllo se dentro la lista degli attori e' presente quello che cerco
            if (err) console.log(err.message); 
            else res.send(result); // mostra nel browser il risultato della get
            client.close(); 
        }); 

    });
});

//Ricerca un film in base a due parametri: durata e anno di produzione
//Tutti i film che hanno una certa durata e sono stati girati prima del 2000
router.get('/length_year/:length/:year', function(req, res, next){
    console.log(req.params);
    let numLength = parseInt(req.params.length);
    let numYear = parseInt(req.params.year);

    const uri = 'mongodb+srv://ricardorodriguez:Rcy_kj0_p@nraboy-sample.bf8zs.mongodb.net/nraboy-sample?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies"); 

        // eseguo una find sulla collection. Due possibili modi:
        //1)  {'runtime' : numLength, 'year' : {$lt : numYear}}
        //2)  {$and : [{'runtime' : numLength} , {'year' : {$lt : numYear}}]}
        collection.find({$and : [{'runtime' : numLength} , {'year' : {$lt : numYear}}]}).toArray((err, result) => {   
            if (err) console.log(err.message); 
            else res.send(result); 
            client.close(); 
        }); 
    });
});
module.exports = router;