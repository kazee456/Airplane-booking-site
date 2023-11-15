const htmlpdf = require('pdf-puppeteer');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({origin:'*'}));
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended:true}));


//database connection
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database:"kq"
});

con.connect((err)=>{
    if(err)throw err;
    console.log("connected to database");
});



//user book flight
var time = Date();
app.route('/booking').get((req,res)=>{
    res.sendFile(__dirname + '/views/booking1.html');
}).post((req,res)=>{
    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var origin = req.body.origin;
    var destination = req.body.destination;
    var seat = req.body.seats
    con.query(`insert into customers values('${name}','${surname}','${email}','${seat}','${time}')`,(err,result)=>{
        if(err)throw err;
        console.log('successful');
    });
    con.query(`insert into routes values('${origin}','${destination}')`);
    res.redirect('/booking/inquiry');
});



//booking inquiry
app.route('/booking/inquiry').get((req,res)=>{
    res.sendFile(__dirname + '/views/inquiry.html');
}).post((req,res)=>{
    var email = req.body.email;
    con.query(`select email from customers where email = '${email}'`,(err,result)=>{
        if(err)throw err;

        if(result.length == 0){
            res.send('Booking does not exist');
        }

        else{
            res.send('booking exists');
        }
    });

});



//generate and print ticket report i.e pdf from html
app.route('/ticketReport').get((req,res)=>{
    con.query('select * from customers',(err,result)=>{
        if(result.length == 0){
            res.send('no report! ');
        }
        else{
            res.send(result);
        }
    });
});


const server = app.listen(3000,()=>{
    console.log(`listening on port ${server.address().port}`);
});