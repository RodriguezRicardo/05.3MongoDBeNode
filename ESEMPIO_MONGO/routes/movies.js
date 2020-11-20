var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient; //Importo la libreria mongodb

//visualizza la lista di 10 film facendo sì che si possa richiedere un numero di film definito da un parametro
router.get('/list/:num', function (req, res, next) {

    console.log(req.params);
    let num = parseInt(req.params.num);
    const uri = 'mongodb+srv://ricardorodriguez:Rcy_kj0_p@nraboy-sample.bf8zs.mongodb.net/nraboy-sample?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies"); //Mi connetto alla collection movies
        // perform actions on the collection object
        collection.find().limit(num).toArray((err, result) => {
            if (err) console.log(err.message); //Se c'è qualche errore lo stampo
            else res.send(result);
            client.close(); //Quando ho terminato la find chiudo la sessione con il db
        }); //Eseguo la query e passo una funzione di callback
    });
});

//una funzione che ci permette di ricercare il film in base al titolo.
router.get('/movie_from_title/:title', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    title = req.params.title;
    const uri = 'mongodb+srv://ricardorodriguez:Rcy_kj0_p@nraboy-sample.bf8zs.mongodb.net/nraboy-sample?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies"); //Mi connetto alla collection movies
        // eseguo una find sulla collection
        collection.find({ 'title': `${title}` }).toArray((err, result) => {
            if (err) console.log(err.message); //Se c'è qualche errore lo stampo
            else res.send(result); // mostra nel browser il risultato della get
            client.close(); //Quando ho terminato la find chiudo la sessione con il db
        }); //Eseguo la query e passo una funzione di callback

    });
});

//Ricerca di un film in base all’anno di produzione
router.get('/movie_from_year/:year', function (req, res, next) {
    console.log(req.params); 
    year = parseInt(req.params.year);
    const uri = 'mongodb+srv://ricardorodriguez:Rcy_kj0_p@nraboy-sample.bf8zs.mongodb.net/nraboy-sample?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies"); 
        
        collection.find({ 'year': year }).toArray((err, result) => {
            if (err) console.log(err.message);
            else res.send(result); // mostra nel browser il risultato della get
            client.close(); 
        }); 

    });
});

//Ricerca di un film in base alla valutazione media degli utenti
router.get('/movie_rating/:rating', function (req, res, next) {
    console.log(req.params); 
    rating = parseInt(req.params.rating);
    const uri = 'mongodb+srv://ricardorodriguez:Rcy_kj0_p@nraboy-sample.bf8zs.mongodb.net/nraboy-sample?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies"); 
        collection.find({ 'imdb.rating': rating }).toArray((err, result) => {
            if (err) console.log(err.message);
            else res.send(result); // mostra nel browser il risultato della get
            client.close(); 
        }); 

    });
});
module.exports = router;