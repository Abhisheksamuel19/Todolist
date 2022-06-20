const express = require("express");
const bodyParser = require("body-parser");
const  mongoose  = require("mongoose");

var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/todo");

const trySchema = new mongoose.Schema({
    name : String
});
const item = mongoose.model("task",trySchema);

app.get("/",function(req,res){
   item.find({},function(err,foundItems){
    if(err){
        console.log(err);
    }
    else {
        res.render("list",{ejes : foundItems});
    }
   })
});

app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo5 = new item({
        name : itemName
    });
        todo5.save();
        res.redirect("/");
});

app.post("/delete",function(req,res){
     const checked = req.body.checkbox1;
     item.findByIdAndRemove(checked,function(err){
        if(!err){
            console.log("deleted");
            res.redirect("/");
        }
     });
});


app.listen("3000",function(){
    console.log("server is ready");
});