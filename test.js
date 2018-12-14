var assert = require('assert');
const request = require('supertest');
const app = require('./app');

describe('Testing del file app.js  ', function () {
	'use strict';
	it('Sto testando la creazione di un ToDo', function (done) {
		request(app)
			.post('/list')
			.set('Accept', 'application/json')
			.send({
				name: 'Primo',
				description: 'fare la spesa',
				completed: false,
				assignedTo: 'Pippo'
			})
			.expect(201)
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});
	it('Sto aggiungendo ToDo', function (done) {
		request(app)
			.post('/list')
			.set('Accept', 'application/json')
			.send({
				name: 'Secondo',
				description: 'Completare progetto per cliente',
				completed: true,
				assignedTo: 'Lorenza'
			})
			.expect(201)
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});

	it('Testo i ToDo filtrati per utente', function (done) {
		request(app)
			.get('/list_filtered?assignedTo=Pippo')
			.set('Accept', 'application/json')

			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				assert.equal(res.body.length, 1)
				done();
			});
	});
	
	/*/   DA CORREGGERE   /*/

	it('Sto testando la lettura degli utenti', function (done) {
		request(app)
			.get('/users')
			.set('Accept', 'application/json')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				//assert.equal(res.body.length, 2);/*/Sono 2 user inseriti/*/
				done();
			});
	});
	
	/*/   DA CORREGGERE   /*/

it('Test lettura di tutti i ToDo filtrata per stato di completamento', function (done) {
	request(app)
		.get('/list_filtered?completed=false')
		.set('Accept', 'application/json')
		
		.expect(200)
		.end(function (err, res) {
			if (err) return done(err);
			//assert.equal(res.body.length, 1)
			done();
		});
});
	
	/*/   DA CORREGGERE   /*/
	
	it('Test di cancellazione di un ToDo', function (done) {
		request(app)
			.delete('/list/:id')
			.set('Accept', 'application/json')
			.send({
				id: 1
			})
			.end(function (err, res) {
				if (err) return done(err);
				//assert.equal(res.body.length, 1)
				done();
			});
	});

});