var express = require('express');
var app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const cors = require("cors")
app.use(cors())

const { MongoClient, ObjectId } = require('mongodb');
const url = "mongodb://127.0.0.1:27017"

const dbName = 'CleanHouse_db'

app.get("/", function (req, res) {
    res.send("Hello")
})

app.get("/viewAppointments", function (req, res) {
    MongoClient.connect(url, (err, con) => {
        var db = con.db("CleanHouse_db")
        db.collection("Users").find()
            .toArray((err, data) => {
                console.log(data);
                res.send(data)
            })
    })
})

app.post('/newAppointment', (req, res) => {
    console.log(req.body);
    var abbr = req.body.city;
    req.body.reqNo = abbr.substring(0,3).toUpperCase()+"-"+new Date().getFullYear()+"-"+Math.floor(Math.random() * (999) + 100)
    console.log(req.body.reqNo);
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('CleanHouse_db');
        db.collection('Users').insertOne(req.body, (err, data) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                res.send(data);
            }
        });
    });
})

app.listen(9090, function () {
    console.log(" running 9090")
})