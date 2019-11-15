"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
const mongoLogin = "mongoadmin";
const mongoPassword = "secret";
// const mongoPassword = "DlEtALETTdtwtcJF";
// const mongoHost = "cluster0-yh4c1.mongodb.net/test";
const mongoHost = "127.0.0.1";
const mongoPort = "27017";
const app = express();
const port = 8080;
const version = "1.3";
const url = `mongodb://${mongoLogin}:${mongoPassword}@${mongoHost}}:${mongoPort}/`;
// const url = `mongodb+srv://${mongoLogin}:${mongoPassword}@${mongoHost}`;
const mongoClient = new MongoClient(url, {useUnifiedTopology: true});
// let db;
let storageCollection;

// mongoClient.connect(function (err, client) {
//     db = client.db("storage");
//     storageCollection = db.collection("entry");
// });


mongoClient.connect(err => {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   storageCollection = mongoClient.db("storage").collection("entry");
   // perform actions on the collection object
   mongoClient.close();
});

// mongoClient.connect(err => {
//     if (err){
//         console.error(err);
//     } else {
//     storageCollection = mongoClient.db("storage").collection("entry");
//     }
//     // perform actions on the collection object
    
//     //mongoClient.close();
// });

//app.use(express.json());
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../build')));
  
//     // app.get('*', (req, res) => {
//     //   res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
//     // });
//   }

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).json({message: `REST.js ${version}`}));

app.get('/storage', (req, res) => {
    storageCollection.find().toArray(function (err, result) {
        res.status(200).json(result === null ? [] : result);
    });
});

app.get('/storage/:key', (req, res) => {
    storageCollection.find({key: req.params.key}).toArray(function (err, result) {
        if (result === null || result.length === 0) {
            res.status(404).json({message: `Key "${req.params.key}" not found`});
        } else {
            res.status(200).json(result[0]);
        }
    });
});

app.post('/storage', (req, res) => {
 
    if (req.hasOwnProperty("body") && req.body !== null && req.body.hasOwnProperty("key") && req.body.hasOwnProperty("value")) {
        storageCollection.find({key: req.body.key}).toArray(function (err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                if (result.length === 0) {
                    storageCollection.insertOne({key: req.body.key, value: req.body.value}, function (err, result) {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({message: `Key "${req.body.key}" successfully added`});
                        }
                    });
                } else {
                    res.status(304).json({message: `Key "${req.body.key}" exists`});
                }
            }
        });
    } else {
        res.status(412).json({message: "Wrong body or key"});
    }
});

app.put('/storage', (req, res) => {
    if (req.hasOwnProperty("body") && req.body !== null && req.body.hasOwnProperty("key") && req.body.hasOwnProperty("value")) {
        storageCollection.updateOne({key: req.body.key}, {$set: {value: req.body.value}}, function (err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json({message: `Key "${req.body.key}" successfully updated`});
            }
        });
    } else {
        res.status(412).json({message: "Wrong body or key"});
    }
});


app.delete('/storage/:key', (req, res) => {
    storageCollection.deleteOne({key: req.params.key}, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({message: `Key "${req.params.key}" successfully deleted`});
        }
    });
});

app.listen(port, () => console.log(`REST.js ${version} listening on port ${port}`));