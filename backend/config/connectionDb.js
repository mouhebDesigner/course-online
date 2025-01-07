const mongoose = require('mongoose');

const connection = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/recipes').then(() => {
        console.log('Database connected');
    }).catch(err => {
        console.log(err);
    });
}


module.exports = connection;
