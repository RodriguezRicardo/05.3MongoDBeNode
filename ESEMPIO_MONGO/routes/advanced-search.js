var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ricardorodriguez:Rcy_kj0_p@nraboy-sample.bf8zs.mongodb.net/nraboy-sample?retryWrites=true&w=majority'

//Ricerca un film in base a un attore
router.get('/actors/:a', function (req, res, next) {
    console.log(req.params); 
    a = req.params.a;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getActor);

    function getActor(err) {
        if (err) console.log("Conessione al db non riuscita");
        else {
            const collection = client.db("sample_mflix").collection("movies");
            collection.find({cast:{$in : [`${a}`]}}).toArray(callBackQuery);
        }
    }
    function callBackQuery(err, result)  {
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }
});

//Ricerca un film in base a due parametri: durata e anno di produzione
//Tutti i film che hanno una certa durata e sono stati girati prima del 2000
router.get('/length_year/:length/:year', function(req, res, next){
    console.log(req.params);
    let numLength = parseInt(req.params.length);
    let numYear = parseInt(req.params.year);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getLengthYear);

    function getLengthYear(err) {
        if (err) console.log("Conessione al db non riuscita");
        else {
            const collection = client.db("sample_mflix").collection("movies"); 
            collection.find({$and : [{'runtime' : numLength} , {'year' : {$lt : numYear}}]}).toArray(callBackQuery);
            /* eseguo una find sulla collection. Due possibili modi:
            1)  {'runtime' : numLength, 'year' : {$lt : numYear}}
            2)  {$and : [{'runtime' : numLength} , {'year' : {$lt : numYear}}]}*/
        }
    }
    function callBackQuery(err, result)  {
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }
});
module.exports = router;