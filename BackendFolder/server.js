const mongoose = require('mongoose');

const app = require('./app');

const dotenv = require('dotenv');

dotenv.config();

const DB = process.env.MONGO_URI;
mongoose.connect(DB);


const port = process.env.PORT || 5000;

app.listen(port , () => {
    console.log(`App running on port ${port}`);
});