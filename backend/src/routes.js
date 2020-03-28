const express = require('express');
const ongControllers = require('./controllers/ongControllers');
const incidentsController = require ('./controllers/incidentsController');
const profileController = require ('./controllers/profileController');
const sessionController = require ('./controllers/SessionController');


/* desacoplando o módulo de rotas do express na variavel routes*/
const routes = express.Router();

routes.post('/session', sessionController.create);

routes.get('/ongs', ongControllers.index);
routes.post ('/ongs', ongControllers.create); 

routes.get('/incidents', incidentsController.index);
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', incidentsController.delete);

routes.get('/profile', profileController.index);

/* para deixar as rotas disponiveis para o index acessa-las exportar a variavel routes de dentro deste arquivo para o index*/ 
module.exports = routes;