var restify = require('restify'),
    fs = require('fs'),
    path = require('path');

var server = restify.createServer();

server.use(restify.CORS({
    origins: ['*'],
    credentials: true
}));    

server.use(restify.fullResponse());

server.use(restify.pre.sanitizePath());

server.opts(/\.*/, function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, HEAD, OPTION');
    res.header('Access-Control-Allow-Headers', 'authorization, content-type, x-requested-with, x-auth-token');
    res.send(200);
    return next();
});

server.listen(8080, function(){
    console.log("Service listen on: 8080");
});

server.get('/offline/cache.manifest', function(req,res,next){
    var filePath = path.join(__dirname,'www/offline/cache.manifest');
    fs.readFile(filePath, function(error, data){
        res.header('Content-Type', 'text/cache-manifest');
        res.send(200, data.toString());
    });
});
server.get(/offline(\/)*.*/, restify.serveStatic({
    directory: path.join(__dirname, 'www'),
    maxAge:0,
    default: 'index.html'
}));

server.get(/\/.*/, restify.serveStatic({
    directory: path.join(__dirname, 'www/person'),
    maxAge:0,
    default: 'index.html'
}));

server.get(/person\/.*/, restify.serveStatic({
    directory: path.join(__dirname, 'www'),
    maxAge:0
}));

server.get('/persons', function(req, res, next){
    res.send(200, []);
});

server.get('/demodata', function(req, res, next){
    res.send(200, []);
});
