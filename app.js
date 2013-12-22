var express = require('express'), 
	http = require('http'), 
	path = require('path'),
	wines = require('./routes/wines'); 

var app = express();

// all environments
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

//development only
app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/api/wines', wines.findAll);
app.get('/api/wines/:id', wines.findById);
app.put('/api/wines/:id', wines.updateWine);
app.post('/api/wines', wines.create);
app.get('/home/*',  function(req, res){
    res.sendfile(__dirname+'/public/index.html');
});


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
