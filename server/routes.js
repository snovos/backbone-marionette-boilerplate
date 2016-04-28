var users = require('./controllers/users');

module.exports.initialize = function(app) {
    app.get('/api/users', users.index);
    app.post('/api/users', users.add);
    app.delete('/api/contacts/:id', users.delete);
};