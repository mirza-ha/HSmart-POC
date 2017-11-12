
var Keycloak = require('keycloak-connect');
var hogan = require('hogan-express');
var express = require('express');
var session = require('express-session');

var app = express();


var DetailArray = [{ detail1: "Narcisa", detail2: "Ćeman-Hadžiomerović" },
{ detail1: "Mirza", detail2: "Hadžiomerović" },
{ detail1: "Ahmed", detail2: "Hadžiomerović" },
{ detail1: "Zejd", detail2: "Hadžiomerović" },
{ detail1: "Iman", detail2: "Hadžiomerović-?" },
{ detail1: "Mejrema", detail2: "Hadžiomerović" },
{ detail1: "Mirsad", detail2: "Hadžiomerović" },
{ detail1: "Hadija", detail2: "Ćeman" },
{ detail1: "Desto", detail2: "Ćeman" }];



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

app.get('/login', keycloak.protect(), function (req, res) {
    res.render('index', {
        result: JSON.stringify(JSON.parse(req.session['keycloak-token']), null, 4),
        event: '1. Authentication\n2. Login'
    });
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
    .get(keycloak.protect(), function (req, res) {
    res.json(DetailArray); // .end('ABC')
});
app.route('/details/:count')
    .get(function (req, res) {
        res.json(DetailArray.slice(0, req.params.count));
    });
app.route('/detail/:id')
    .get(function (req, res) {
        var r;
        DetailArray.forEach(function (det) {
            if (det.detail1 === req.params.id)
                r = det;
        });
        res.json(r);
    });


app.get('/data', keycloak.protect(), (req,res) => { res.end("ABC") })

console.log("Listening :", app.listen(8090).address().port);
//# sourceMappingURL=na2.js.map