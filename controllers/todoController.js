
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://*********:**********@ds137464.mlab.com:37464/jktodo', { useMongoClient: true });


//Create schema
var todoSchema = new mongoose.Schema({
    item: String
});
//Create model
var Todo = mongoose.model('Todo', todoSchema);

var urlEncodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {


    app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlEncodedParser, function (req, res) {
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {

        Todo.find({ item: req.params.item.replace(/\-/g, ' ').trim()}).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
};
