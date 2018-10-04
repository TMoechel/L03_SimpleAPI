var _ = require('lodash');

var personRouter = require('express').Router();

var KeyId = 0;
var PersonList = [];


//find person by id middleware
personRouter.param('id', function(req, res, next, id) {
    var person = _.find(PersonList, {ID: parseInt(id)});

    if (person) {
        req.person = person;
        next();
    } else {
        res.send();
    }
})

//update key id middleware 
var updateId = function(req, res, next) {
    if (!req.body.id) {
        KeyId++;
        req.body.ID = KeyId 
    }
    next();
}

personRouter.get('/', function(req,res){
    res.json(PersonList);
});

// ** Get one element
//GET request http://localhost:3000/personList/3
personRouter.get('/:id', function(req,res){
    var person = PersonList.filter(t=> t.ID == parseInt(req.params.id));
    res.json(person);
});

// ** save one element
//POST request http://localhost:3000/personList
personRouter.post('/', updateId, function(req,res){
    var person = req.body;
    PersonList.push(person);
    res.json(person);
});

//PUT request http://localhost:3000/personList/3
personRouter.put('/:id', function(req, res) {
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
personRouter.delete('/:id', function(req, res) {
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

personRouter.use(function(err, req, res, next) {
    if (err) {
        console.log(err.message);
        res.status(500).send(err)
    }
})

module.exports = personRouter;