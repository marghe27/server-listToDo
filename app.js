var express = require('express');
var app = express();
/// il mio file 
var fakeList = require('fakelist-to-do');


var bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended: true
}));


//POST Di Creazione ToDo
//PUT di modifica di ToDo in base all'id
//GET lettura di tutti i ToDo filtrata per utente
//GET lettura di tutti gli utenti disponibili
//GET lettura di tutti i ToDo filtrata per stato di completamento
//DELELTE Cancellazione di un ToDo


//POST Di Creazione ToDo
app.post('/list', function (req, res) { 
	'use strict';
	fakeList.addList(req.body.name, req.body.description,req.body.completed, req.body.assignedTo);
    res.status(201).json();
	
	
});

//GET lettura di tutti i ToDo filtrata per utente e per completamento
app.get('/list_filtered', function(req, res){
	'use strict';
	
    if (req.query.assignedTo) {
    	res.json(fakeList.searchAssigned(req.query.assignedTo));
    } else if (req.query.completed) {
    	res.json(fakeList.readByState(req.query.completed));
    } else {
    	res.json(fakeList.getUsers());
    }
	
});

//GET lettura di tutti gli utenti disponibili
app.get('/users', function(req, res) {
	'use strict';
    res.json(fakeList.getUsers());
});

//PUT di modifica di ToDo in base all'id

app.put('/list/:id', function (req, res) {
	'use strict';
	  var i = parseInt(req.params.id);
	
	 fakeList.changeTheState(i,req.body.completed);
     res.json();
});
	

//GET lettura di tutti i ToDo filtrata per stato di completamento // spostare dentro un if, vedi sopra 
//app.get('/list', function (req, res) {
	//'use strict';
	
	//res.status(200).json();

//});

//DELETE Cancellazione di un ToDo

app.delete('/list/:id', function (req, res) { 
	'use strict';
	var i = parseInt(req.params.id);
	res.json(fakeList.deleteList(i));
});


app.listen(3001);

module.exports = app;
