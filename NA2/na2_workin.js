Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Keycloak = require("keycloak-connect");
var hogan = require("hogan-express");
var session = require("express-session");
var cors = require('cors')
 

var app = express();

app.use(cors())

/*var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
  }*/



var DetailArray = [{ detail1: "Narcisa", detail2: "Ćeman-Hadžiomerović" },
    { detail1: "Mirza", detail2: "Hadžiomerović" },
    { detail1: "Ahmed", detail2: "Hadžiomerović" },
    { detail1: "Zejd", detail2: "Hadžiomerović" },
    { detail1: "Iman", detail2: "Hadžiomerović-?" },
    { detail1: "Mejrema", detail2: "Hadžiomerović" },
    { detail1: "Mirsad", detail2: "Hadžiomerović" },
    { detail1: "Hadija", detail2: "Ćeman" },
    { detail1: "Desto", detail2: "Ćeman" }];

//app.set("Origin", "http://localhost:8090");
app.set('view engine', 'html');
app.set('views', require('path').join(__dirname, '/view'));
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

app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/'
  }));


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
    .get(keycloak.protect(), function (req, res) {
    res.json(DetailArray);
});

app.route('/details/:count')
    .get(function (req, res) {

    res.json(DetailArray.slice(0, req.params.count));
});

app.route('/detail/:id')
    .get(function (req, res) {
    var r;
    DetailArray.forEach(function (det) { if (det.detail1 === req.params.id)
        r = det; });
    res.json(r);
});


app.get('/ping', keycloak.protect(), function (req, res) {
    res.end("ping reply")
  });


console.log("Listening :", app.listen(8090).address().port);
//# sourceMappingURL=na2.js.map