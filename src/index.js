const mongoose = require('mongoose')
require('dotenv').config();
const express = require('express')
const unitDBSave = require('./services/unitDBSave');
const unitRoutes = require('./router/units')

const api = express();
const port = process.env.PORT || 9000

api.use(express.json());
api.use('/',unitRoutes);

async function app() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB Local");
        await unitDBSave()
    
    } catch (error) {
        console.error(error);
    }
}
setInterval(app, 60000);

api.listen(port, () => console.log('server listening on port', port));