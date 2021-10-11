//dependencies
var express = require('express');
var router = express.Router();
var fs = require('fs');

//-----------ENDPOINTS/ROUTS------

//---CRUD---- for Messages---

// 'READ'
router.get('/', function(req, res){
    console.log("All Messages")
    try{
        const rawData = fs.readFileSync('data.json'); // raw data       
        //parse raw data
        var chat = JSON.parse(rawData);
        // log 
        console.log(chat);
        // status  ok
        res.status(200).json(chat);
    }
    catch(err){
        //status messege error
        res.status(500).json({message: err.message});
    }
});

// get by id
router.get('/:id', function(req, res){
    console.log("Message")
    try{
        const rawData = fs.readFileSync('data.json'); // raw data       
        //parse raw data
        var chat = JSON.parse(rawData);
        // log 
        console.log(chat[req.params.id]);
        // status  ok
        res.status(200).json(chat[req.params.id]);
    }
    catch(err){
        //status messege error
        res.status(500).json({message: err.message});
    }
});

// 'C' Create
router.post('/', function(req, res){
    try{
        console.log("New Message: ", req.body);
        // open file
        const rawData = fs.readFileSync('data.json');
        //parse data
        var chat = JSON.parse(rawData);

        //control data
        var rawBody = req.body;

        var newChat ={
            channel:"main", //<<< this needs to move down to where timestamp is and figure out how to get channel name here,
            name: null,
            message: null,                              
        }        
        if (rawBody.channel != null)
        {
           newChat.channel = rawBody.channel;
        }
        if (rawBody.name != null)
        {
           newChat.name = rawBody.name;
        }
        if (rawBody.message != null)
        {
           newChat.message = rawBody.message;
        }
        //id and timestamp
        newChat._messageID = chat.length;
        newChat.time = ("Posted on "+ new Date());        

        //add new message to newChat arrayy
        chat.push(newChat);

        //save back to data.json
        const data = fs.writeFileSync('data.json', JSON.stringify(chat));
        //return data to user
        res.status(200).json(chat);
    }
    catch (err){
        res.status(500),json({message: err.message});
    }
});
//----U----
// patch/update by id
router.patch('/:id', function(req, res){
    console.log("Edited Message: ", req.body);
    try{
        console.log("Edited Message: ",req.params.id, req.body);
        // open file
        const rawData = fs.readFileSync('data.json');
        //parse data
        var chat = JSON.parse(rawData);

        //control data
        var rawBody = req.body;
        var id = req.params.id;
                
        if (rawBody.channel != null)
        {
            chat[id].channel = rawBody.channel+" (updated)";
        }
        if (rawBody.name != null)
        {
            chat[id].name = rawBody.name+" (updated)";
        }
        if (rawBody.message != null)
        {
            chat[id].message = rawBody.message+" (updated)";
        }
        //add timestamp      
        chat[id].time = ("(Updated on) "+ new Date());

        //save back to data.json
        const data = fs.writeFileSync('data.json', JSON.stringify(chat));
        //return data to user
        res.status(200).json(chat[id]);
    }
    catch (err){
        res.status(500),json({message: err.message});
    }
});

//'D' Delete message by id

router.delete('/:id', function(req, res){
    console.log("Message Deleted: ", req.body);

    //capture the id
    var id = req.params.id; 

    //open the file "reading"
    const rawData = fs.readFileSync('data.json');
    //parse
    var chat =JSON.parse(rawData); 

    // if found delete 
    if (chat.length > id){
    //modify object at id, replace/delete 1... nothing to replace              
        chat.splice(id, 1); 

    // (write) the data back to the file
        const data = fs.writeFileSync('data.json',JSON.stringify(chat));
    //ok message + ID THAT WAS DELETED
        res.status(200).json({message: "Message Deleted, _messageID # "+ id})
    }
    else {
        res.status(500).json({message: "Try again, Something went wrong"})
    }  
});
//            ------END OF CRUD FOR MESSAGES--------

//          ----CRUD FOR CHAT ROOMS------


//------END OF ENDPOINTS----     

module.exports = router;