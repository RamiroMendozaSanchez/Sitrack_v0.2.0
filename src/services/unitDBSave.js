const unitsSchema = require("../models/units");
const sendInfoSitrack = require('../services/sendInfoSitrack');

async function saveUnit(){
    try {
        const unitsShipped = await sendInfoSitrack();

        for (const unit of unitsShipped) {
            const newUnit = new unitsSchema(unit);
            await newUnit.save();
        }
        console.log("Objetos insertados correctamente",unitsShipped);
    } catch (error) {
        console.error('Error al insertar objeto JSON: ', error);
    }
}

async function unitsDBsave() {
    try {
        const count = await unitsSchema.countDocuments();
        if (count > 0) {
            const deleteResult = await unitsSchema.deleteMany();
            console.log('Documentos eliminados:', deleteResult.deletedCount);
        }
        await saveUnit();
    } catch (error) {
        console.error('Error al contar documentos:', error);
    }
    
}

module.exports = unitsDBsave;