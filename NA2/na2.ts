import express = require("express")

import { Details } from './details';

import Keycloak = require('keycloak-connect');
import hogan = require('hogan-express');
import session = require('express-session');

var app = express();



const DetailArray: Details[] = [{ detail1: "Narcisa", detail2: "Ćeman-Hadžiomerović" },
{ detail1: "Mirza", detail2: "Hadžiomerović" },
{ detail1: "Ahmed", detail2: "Hadžiomerović" },
{ detail1: "Zejd", detail2: "Hadžiomerović" },
{ detail1: "Iman", detail2: "Hadžiomerović-?" },
{ detail1: "Mejrema", detail2: "Hadžiomerović" },
{ detail1: "Mirsad", detail2: "Hadžiomerović" },
{ detail1: "Hadija", detail2: "Ćeman" },
{ detail1: "Desto", detail2: "Ćeman" }];


app.set('view engine', 'html');
app.engine('html', hogan);


app.get('/', function (req, res) {
  res.render('index');
});

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));


var keycloak = new Keycloak({
  store: memoryStore
});


/*app.route('/')
    .get(function (req, res) {
        let rts: string = "";
        app._router.stack.forEach(function (r) {
            if (r.route && r.route.path) {
                rts += '<p><a href="' + r.route.path + '">' + r.route.path + '</a></p>';
            }
        })
        res.end(rts);
    })*/

app.route('/details')
    .get(keycloak.protect(''), (req, res) => {
        res.json(DetailArray);
    })

app.route('/details/:count')
    .get((req, res) => {
        res.json(DetailArray.slice(0, req.params.count));
    })

app.route('/detail/:id')
    .get((req, res) => {
        let r: Details;
        DetailArray.forEach(det => { if (det.detail1 === req.params.id) r = det; })
        res.json(r);
    })


console.log("Listening :", app.listen(8090).address().port);

