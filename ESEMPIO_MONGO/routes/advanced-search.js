var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;

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

module.exports = router;