var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    routes = require('./server/routes'),
    app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + './');
app.use('/', express.static(path.join(__dirname, './')));


app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('some-secret-value-here'));

app.use(app.router);


app.get(function (req, res, next) {
    if (req.accepts('html')) res.sendfile('/index.html')
    else next()
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//connect to the db server:
mongoose.connect('localhost/boilerplate');
mongoose.connection.on('open', function() {
    console.log("Connected to DB...");
});


//routes list:
routes.initialize(app);

//finally boot up the server:
http.createServer(app).listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
