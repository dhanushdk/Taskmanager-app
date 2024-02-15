var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app=Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://dk013969:Dhanush8078@cluster0.vcpyllz.mongodb.net/?retryWrites=true&w=majority";




var DATABASENAME ="taskmanagerdb";
var database;

app.listen(4038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database = client.db(DATABASENAME);
        console.log("Monogodb succ");
    });
})

app.get('/api/taskmanagerapp/GetNotes',(request,response)=>{
    database.collection("taskmanagercollection").find({}).toArray((error,result)=>{
        response.send(result);
    });
})

app.post('/api/taskmanagerapp/AddNotes',multer().none(),(request,response)=>{
    database.collection("taskmanagercollection").count({},function(error,numofDocs){
        database.collection("taskmanagercollection").insertOne({
            id:(numofDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Task added Successfull");
    });
})

app.delete('/api/taskmanagerapp/DeleteNotes',(request,response)=>{
    database.collection("taskmanagercollection").deleteOne({
        id:request.query.id
    });
    response.json("Task Deleted Successfull")
})