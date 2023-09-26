const IdSchema = require("../models/Ids");
const getId = require('../externalApis/getId')

async function saveId(){
    try {
        const idsService = await getId();

        for (const grupId of idsService) {
            const newGroupId = new IdSchema(grupId);
            await newGroupId.save();
        }
        console.log("Objetos insertados correctamente");
    } catch (error) {
        console.error('Error al insertar objeto JSON: ', error);
    }
}

async function idsDBsave() {
    try {
        const count = await IdSchema.countDocuments();
        if (count > 0) {
            const deleteResult = await IdSchema.deleteMany();
            console.log('Documentos eliminados:', deleteResult.deletedCount);
        }
        await saveId();
    } catch (error) {
        console.error('Error al contar documentos:', error);
    }
    
}

module.exports = idsDBsave;
