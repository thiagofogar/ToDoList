var Task = require('./models/task');

    module.exports = function(app) {

        app.get('/api/tasks', function(req, res) {
            Task.find(function(err, tasks) {
                if (err)
                    res.send(err);

                res.json(tasks); 
            });
        });

        app.get('/api/tasks/:id', function (req, res) {
            Task.findById(req.params.id, function (err, task) {
                if (err)
                    res.send(err);

                res.json(task);
            });
        });

        app.post('/api/tasks', function (req, res) {
            var task = new Task();
            task.task = req.body.task;
            task.description = req.body.description;
            task.progress = req.body.progress;
            task.status = req.body.status;
            task.created_at = new Date();
            task.dueDate =  new Date(req.body.dueDate);

            console.log(req.body.dueDate);

            task.save(function(err, task) {
                if (err)
                    res.send(err);

                res.json(task);
            });
            
        });

        app.put('/api/tasks/:id', function(req, res) {
            Task.findByIdAndUpdate(req.params.id, req.body, function (err, task) {
                if (err) {
                    return next(err);
                } else {
                    console.log(task);
                    res.json(task);
                }
            });
        });
        
        app.delete('/api/tasks/:id', function(req, res) {
            Task.remove({
                _id: req.params.id
            }, function(err, tarefa) {
            if (err)
                res.send(err);
            }); 
            res.send(200);
        });

        app.get('*', function(req, res) {
            res.redirect('/');
        });

    };