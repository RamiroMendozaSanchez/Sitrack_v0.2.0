const express = require('express')
const getInfoServer = require('../services/getInfoServer')
const unitsSchema = require("../models/units");
const cors = require('cors');

const os = require('os');

const router = express.Router();
router.use(cors());

router.get('/server', (req, res) => {
    try {
        console.log('Info Server');
        res.json(getInfoServer());
        return getInfoServer();
    } catch (error) {
        console.log(error);
    }
});

router.get('/unit', (req, res) => {
    unitsSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})


module.exports = router;