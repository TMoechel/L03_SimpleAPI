var server = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

describe('personList', function () {
    it('Should get all Persons', function (done) {
        request(server)
            .get('/personList')
            .set('Accept', 'application/json')
            .expect('Content-Type', '/json/')
            .expect(200)
            .end(function (err, resp) {
                expect(resp.body).to.be.an('array');
                done();
            });
    })

    it('Should get a Person', function (done) {
        request(server)
            .post('/personList')
            .send({
                FirstName: "John",
                LastName: "Miller",
                Age: 34
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', '/json/')
            .end(function (err, resp) {
                var person = resp.body;
                request(server)
                    .get('/personList/' + person.ID)
                    .end(function (err, response) {
                        expect(resp.body).eql(person);
                        done();
                    });
            });
    })

    it('Should create a Person', function (done) {
        request(server)
            .post('/personList')
            .send({
                FirstName: "John",
                LastName: "Miller",
                Age: 34
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', '/json/')
            .expect(201)
            .end(function (err, resp) {
                var person = resp.body;
                expect(person.FirstName).to.be.equal('John')
                expect(person.LastName).to.be.equal('Miller')
                expect(person).to.be.an('object');
                done();
            });
    })

    it('Should update a Person', function (done) {
        request(server)
            .post('/personList')
            .send({
                FirstName: "John",
                LastName: "Miller",
                Age: 34
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', '/json/')
            .end(function (err, resp) {
                var person = resp.body;
                request(server)
                    .put('/personList/' + person.ID)
                    .send({
                        FirstName: "Herbert",
                        LastName: "Miller",
                        Age: 34
                    })
                    .end(function (err, resp) {
                        expect(resp.body.FirstName).to.be.equal("Herbert");
                        done();
                    });

            });
    })

    it('Should delete a Person', function (done) {
        request(server)
            .post('/personList')
            .send({
                FirstName: "John",
                LastName: "Miller",
                Age: 34
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', '/json/')
            .end(function (err, resp) {
                var person = resp.body;
                request(server)
                    .delete('/personList/' + person.ID)
                    .end(function (err, response) {
                        expect(resp.body).eql(person);
                        done();
                    });
            });
    })
});