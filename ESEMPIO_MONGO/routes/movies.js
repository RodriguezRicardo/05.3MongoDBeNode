//import e inizializzazione della libreria mongodb
var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient; 
const uri = 'mongodb+srv://ricardorodriguez:Rcy_kj0_p@nraboy-sample.bf8zs.mongodb.net/nraboy-sample?retryWrites=true&w=majority'

/*visualizza la lista di 10 film facendo sì che si possa richiedere un numero di film definito da un parametro
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
});*/

//visualizza la lista di 10 film facendo sì che si possa richiedere un numero di film definito da un parametro
router.get('/list/:num', function (req, res, next) {

    console.log(req.params);
    let num = parseInt(req.params.num);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getListMovies);  //la funzione "getListMovies viene esplicitata"

    function getListMovies(err) {
        if (err) console.log("Conessione al db non riuscita");
        else {
            const collection = client.db("sample_mflix").collection("movies");
            collection.find().limit(num).toArray(callBackQuery);
        }
    } 
    //quando la query va a buon fine, invia il risultato
    function callBackQuery(err, result)  {
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }
    /*la gestione della route viene divisa in 2 parti.
    - La funzione dove si connette alla collection del mongoDB ed cerca quello che vogliamo trovare
    - La funzione che se la query va a buon fine, invia il risultato. "function callBackQuery()"
    */
});

//una funzione che ci permette di ricercare il film in base al titolo.
router.get('/movie_from_title/:title', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    title = req.params.title;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getTitle);

    function getTitle(err) {
        if (err) console.log("Conessione al db non riuscita");
        else {
            const collection = client.db("sample_mflix").collection("movies"); //Mi connetto alla collection movies
            collection.find({ 'title': `${title}` }).toArray(callBackQuery);
        }
    }
    function callBackQuery(err, result)  {
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }
});

//Ricerca di un film in base all’anno di produzione
router.get('/movie_from_year/:year', function (req, res, next) {
    console.log(req.params); 
    year = parseInt(req.params.year);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getYear);

    function getYear(err) {
        if (err) console.log("Conessione al db non riuscita");
        else {
            const collection = client.db("sample_mflix").collection("movies"); //Mi connetto alla collection movies
            collection.find({ 'year': year }).toArray(callBackQuery);
        }
    }
    function callBackQuery(err, result)  {
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }
});

//Ricerca di un film in base alla valutazione media degli utenti
router.get('/movie_rating/:rating', function (req, res, next) {
    console.log(req.params); 
    rating = parseInt(req.params.rating);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(getRating);
    function getRating(err) {
        if (err) console.log("Conessione al db non riuscita");
        else {
            const collection = client.db("sample_mflix").collection("movies"); //Mi connetto alla collection movies
            collection.find({ 'imdb.rating': rating }).toArray(callBackQuery);
        }
    }
    function callBackQuery(err, result)  {
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }
});
module.exports = router;