var MongoClient = require('mongodb').MongoClient;
const express = require('express');
var url = "mongodb://localhost:27017/";

var app = express();
app.set('port',process.env.PORT || 3000);

MongoClient.connect(url,function(err,db){
    if(err){
        throw err;
    }
   //auto call after game ends
   app.get('/name/:name/score/:score',function(req,res,next){
    var dbo = db.db('shadow');
    var myObj = { name:req.params.name,
                  score:req.params.score
                };
    dbo.collection('shadow').insertOne(myObj,function(err,res){
        if(err){
            throw err;
        }
        console.log('1 document inserted successfully');
        db.close();
    }); 
   });
   // at start of game
   app.get('/name/:name',function(req,res,next){
    var dbo = db.db('shadow');
    var query = {
        name:req.params.name
            };
    dbo.collection('shadow').find(query).toArray(function(err,result){
        if(err) throw err;
        console.log(result);
        res.status(200).send(result);
        db.close();
    }); 
   });


  
});
