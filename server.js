var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var morgan = require('morgan');

var app = express();

var KeyId = 0;
var PersonList = [];

var updateId = function(req, res, next) {
    if (!req.body.id) {
        KeyId++;
        req.body.ID = KeyId 
    }
    next();
}

app.use(morgan('dev'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());

app.param('id', function(req, res, next, id) {
    var person = _.find(PersonList, {ID: parseInt(id)});

    if (person) {
        req.person = person;
        next();
    } else {
        res.send();
    }
})

// ** Get complete list
//GET request http://localhost:3000/personList
app.get('/personList', function(req,res){
    res.json(PersonList);
});

// ** Get one element
//GET request http://localhost:3000/personList/3
app.get('/personList/:id', function(req,res){
    var person = PersonList.filter(t=> t.ID == parseInt(req.params.id));
    res.json(person);
});

// ** save one element
//POST request http://localhost:3000/personList
app.post('/personList', updateId, function(req,res){
    var person = req.body;
    PersonList.push(person);
    res.json(person);
});

//PUT request http://localhost:3000/personList/3
app.put('/personList/:id', function(req, res) {
    var newPerson = req.body;
    var personIndex = _.findIndex(PersonList, {ID: parseInt(req.params.id)});
    var personToUpdate = PersonList[personIndex];
    if (!personToUpdate) {
        res.send()
    }
    else{
        var updatedPerson = _.assign(personToUpdate, newPerson);
        res.json(updatedPerson);
    }
});

//DELETE request http://localhost:3000/personList/3
app.delete('/personList/:id', function(req, res) {
        var personToDelete = PersonList.filter(t=> t.ID == req.params.id);
        if (!personToDelete) {
            res.send();
        } else {
            // get index of object
            const index = PersonList.findIndex(p => p === personToDelete);
            PersonList.splice(index, 1);
            res.json(personToDelete)
        }
});

app.use(function(err, req, res, next) {
    if (err) {
        res.status(500).send(err)
    }
})

//POST request http://localhost:3000/personList
app.post('/personList', function(req,res){
    var person = req.body;
    console.log(person);
    PersonList.push(person);
    res.json(person);
})

var port = 3000;

app.listen(port);

console.log('node server is running on port 3000');