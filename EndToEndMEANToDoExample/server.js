var express = require('express'),
    app = express(),
    mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

app.use(express.bodyParser());
app.configure(function () {
                app.use(express.favicon());
                app.use(express.bodyParser());
                app.use(express.logger('dev'));  //tiny, short, default
                app.use(app.router);
                app.use(express.static(__dirname));
                app.use(express.errorHandler({dumpExceptions: true, showStack: true, showMessage: true}));
});
app.listen(process.env.PORT || 8000);

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('todos', server, {w:0});
 
db.open(function(err, db) {
    if(!err) {
        db.collection('todos', {strict:true}, function(err, collection) {
            if (err) {
               db.collection('todos', function(err, collection) {
        			collection.insert({'text':'hi!', 'done':'false'}, {safe:true}, function(err, collection) {
        				"Cannot connect to MongoDB server.."
        			});
    			});
            }
        });
    }
});
    
app.get('/todos', function(req, res) {
    console.log('requesting all todos');
	db.collection('todos', function(err, collection) {
        collection.find().toArray(function(err, todos) {
            res.send(todos);
        });
    });
});

app.delete('/todos', function(req, res) {
    console.log('archiving completed todos');
    db.collection('todos', function(err, collection) {
        collection.remove({'done': 'true'}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
});

app.post('/todo/:tasktext/:done', function(req, res) {
    console.log('posting new todo');
    var newtodo = {
    text : req.params.tasktext,
    done : req.params.done
    };

    db.collection('todos', function(err, collection) {
        collection.insert(newtodo, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(201);
            }
        });
    });
});


app.put('/todo/:tasktext/:done', function(req, res) {
    console.log('flipping todo status');

    db.collection('todos', function(err, collection) {
        collection.update({'text': req.params.tasktext}, {$set:{'done': req.params.done}}, {w:1}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(200);
            }
        });
    });
});


