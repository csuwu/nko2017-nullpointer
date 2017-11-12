const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;
const mongo=require('./services/mongoservice').mongo

app.use(express.static(__dirname));

app.get('/', function(req, res,next) { 
    res.sendFile(__dirname + '/ui/index.html');
});

app.get('/scripts/main.js', function(req, res,next) {  
    res.sendFile(__dirname + '/scripts/main.js');
});

app.get('/css/style.css', function(req, res,next) {  
    res.sendFile(__dirname + '/css/style.css');
});

server.listen(port, () => {
	console.log('app is listening to ' + port);
});  


io.on('connection', function(client) {  
    client.on('playerConnect', (playerName) => {
        console.log(playerName + ' Connected!');
        mongo((err,db)=>{
            if(!err){
                getAll(db)
            }
        })
    });

    client.on('finish', (data) => {
        mongo((err,db)=>{
            
            db.collection("score").save(data,{},(err, result) => {
                if(!err){
                    console.log(data)
                    client.emit('player',{uid:data._id})
                    getAll(db)
                }
                
            
                });

                
            })
    
    });
});


let getAll=(db) =>{
    const cursor=db.collection("score").find();
    let data=[]
    
    cursor.each((err, doc) => {

        if(err){
            console.log("error")
            console.log(err)
        }

        if (doc != null) {
           data.push(doc);
        } else {
            io.emit('scoreUpdate',{data:data})
            db.close()
        }

       

        
     });
     
     
    

}