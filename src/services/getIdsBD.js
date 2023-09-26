const { model } = require("mongoose");
const IdSchema = require("../models/Ids");

async function getIdsBD() {
    try {
        const data = await IdSchema.find();
        console.log('Ids desde BD');
        return data 
    } catch (error) {
        console.error(error);
        throw error; // Puedes propagar el error si lo deseas
    }
}

module.exports = getIdsBD;