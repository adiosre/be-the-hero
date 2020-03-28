/*importar o módulo express para dentro da váriavel express (contem todas as funcionalidades do framework express)*/
const express = require('express');
const cors = require('cors');
/*importar rota do routes.js */
const routes = require('./routes');

/*instanciar a aplicação; variavel que armazena a aplicação*/
const app =  express ();

app.use(cors());
/*Informar que estamos utilizando json para realizar requisições
colocar antes das rotas
express converter o json em objeto de javascript */
app.use (express.json());
app.use(routes);


/*definir a porta da aplicação*/
app.listen (3333);
