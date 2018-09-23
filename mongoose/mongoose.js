const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Pasport')
    .then(x => {
        console.log("Database Connected");
    })
    .catch(err => {
        console.log('Somehting went wrog', err);
    })

module.exports = mongoose;