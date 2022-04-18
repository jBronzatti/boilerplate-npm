const express = require('express');
const app = express();
//const mySecret = process.env['MESSAGE_STYLE']
const bodyParser = require('body-parser')

app.use("/public", express.static(__dirname+"/public"));

app.use(function(req,res,next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/views/index.html")
});

/*
app.get('/json',(req,res)=>{
  mySecret=='uppercase'? res.json({"message":"Hello json".toUpperCase()}):res.json({"message":"Hello json"})
});
*/
app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({
      "message": "HELLO JSON"
    });
  }
    res.json({
      "message": "Hello json"
    });  
});

app.get("/now",function(req,res,next){
  req.time = new Date().toString();
  next();
}, function(req,res){
  res.json({"time":req.time})
});

app.get("/:word/echo",function(req,res){
  const { word } = req.params;
  res.json({"echo":word})
});

app.get("/name",function(req,res){
  var { first: firstname, last: lastname } = req.query;
  res.json({"name":`${firstname} ${lastname}`})
});

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json());

app.post('/name',function(req,res){
  var { first:firstname, last:lastname } = req.body
  res.json({"name":`${firstname} ${lastname}`})
})



























 module.exports = app;
