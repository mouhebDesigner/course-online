const express = require('express');
const app = express();
require('dotenv').config();


// Middleware to parse JSON body
app.use(express.json());

const connectDb = require('./config/connectionDb');
connectDb();

require('./routes/course');
const cors = require('cors');
app.use(cors());

app.use('/course', require('./routes/course'));

app.get('/product', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
