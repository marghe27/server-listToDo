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
				completed: 'false', /* non accetta il valore booleano */
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
				completed: 'true', /* non accetta il valore booleano */
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
				assert.equal(res.body.length, 1);
				done();
			});
	});
	
	/*/   Lettura di tutti i ToDo filtrata per stato di completamento /*/

it('Test lettura di tutti i ToDo filtrata per stato di completamento', function (done) {
	request(app)
		.get('/list_completed?completed=false')       
		.set('Accept', 'application/json')
		
		.expect(200)
		.end(function (err, res) {
			if (err) return done(err);
			assert.equal(res.body.length,1);
			done();
		});
});
	
	
	/*/   Lettura di tutti gli utenti disponibili (array _users di index.js) /*/

	it('Sto testando la lettura di tutti gli utenti disponibili', function (done) {
		request(app)
			.get('/users')
			.set('Accept', 'application/json')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				assert.equal(res.body.length, 4); /*/Sono 4 users gli utenti nell'array _users di index.js /*/
				done();
			});
	});
	
	/* /*   Sto testando il funzionamento della API che legge tutti i ToDo tramite  il metodo getList ()    **/ 
	it('Sto testando la lettura della LIST tramite  il metodo getList () ', function (done) {
		request(app)
			.get('/list')
			.set('Accept', 'application/json')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				assert.equal(res.body.length, 2);  /*/Sono 2 i ToDo inseriti nel body /*/
				done();
			});
	});
	
	
	/*/   DA CORREGGERE   /*/
	
	it('Test di cancellazione di un ToDo', function (done) {
		request(app)
			.delete('/list_deleted/0')
			.set('Accept', 'application/json')
			//.send({ 
//				id: 3
//			})
			.end(function (err, res) {
				if (err) return done(err);
				assert.equal(res.body.length, 1);
				done();
			});
	});

});