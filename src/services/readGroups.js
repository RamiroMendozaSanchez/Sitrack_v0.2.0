const fs = require("fs").promises;

async function readGroups(callback) {

    // fs.readFile("./data/nameGroups.json", "utf8", (err, data) => {
    //     if (err) {
    //         console.error("Error al leer el archivo:", err);
    //         callback(err, null);
    //     } else {
    //         try {
    //             const datosJSON = JSON.parse(data);
    //             var groups = datosJSON;
    //             console.log("Contenido del archivo JSON Groups:");
    //             callback(null, groups);
    //         } catch (error) {
    //             console.error("Error al analizar el contenido JSON:", error);
    //             callback(error, null);
    //         }
    //     }
    // });

    try {
        const data = await fs.readFile('./data/nameGroups.json', 'utf8');
        const grupos = JSON.parse(data);
        return grupos;
    } catch (error) {
        console.error('Error al leer o analizar el archivo JSON:', error);
        throw error;
    }
}

async function obtenerGrupos() {
    try {
        const grupos = await readGroups();
        console.log('Todos los grupos:', grupos);
        return grupos; // Puedes devolverlos si lo necesitas
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = readGroups;