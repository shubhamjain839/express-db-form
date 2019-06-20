var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/form',function(req,res,next){
  res.render('form',{title:'Form Page'});
});


router.post('/savedata',function(req,res,next){
  var tf1 = req.body.name;
  var tf2 = req.body.email;
  var tf3 = req.body.address;
  mongo.connect(url,{useNewUrlParser:true},function(err,db){
    if(err) throw err;
    console.log('DB Connected');
    var dbs = db.db('db1');
    var data = {"Name":tf1,"Email-id":tf2,"Address":tf3};
    dbs.collection('records').insertOne(data,function(err,res){
      if(err) throw err;
      console.log('Record Stored');
    });
    db.close();
  });
  res.render('index',{title:'Express'});
});


router.get('/update',function(req,res,next){
  res.render('update',{title:'Update'});
});


router.post('/updata',function(req,res,next){
  var tf1 = req.body.name;
  var tf2 = req.body.email;
  var tf3 = req.body.address;
  mongo.connect(url,{useNewUrlParser:true},function(err,db){
    if(err) throw err;
    console.log('DB Connected');
    var dbs = db.db('db1');
    var query = { "Email":tf2};
    var data = {$set:{"Name":tf1,"Address":tf3}};
    dbs.collection('records').updateOne(query,data,function(err,res){
      if(err) throw err;
      console.log('Record Updated');
    });
    db.close();
  });
  res.render('index',{title:'Express'});
});



router.get('/delete',function(req,res,next){
  res.render('delete',{title:'Delete'});
});




router.post('/del',function(req,res,next){
  var tf2 = req.body.email;
  mongo.connect(url,{useNewUrlParser:true},function(err,db){
    if(err) throw err;
    console.log('DB Connected');
    var dbs = db.db('db1');
    var query = {"Email":tf2};
    dbs.collection('records').deleteOne(query,function(err,obj){
      if(err) throw err;
      console.log(obj+'Record Deleted');
    });
    db.close();
  });
  res.render('index',{title:'Express'});
});
module.exports = router;