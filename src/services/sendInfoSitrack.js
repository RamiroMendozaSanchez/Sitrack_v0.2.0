const axios = require("axios");
const path = require('path');
require('dotenv').config({path:'../../.env'});
const unitsSchema = require("../models/units");
const getUnits = require('../externalApis/getunits');

async function sendInfoSitrack() {
    const apiSitrack = process.env.API_SITRACK_URL;
    var units = await getUnits();
    const results = [];
    // for (const unit of units) {
    //     const dataSitrack = {
    //         imei_no: unit.imei_no,
    //         lattitude: unit.lattitude,
    //         longitude: unit.longitude,
    //         speed: unit.speed,
    //         angle: unit.angle,
    //         satellite: unit.satellite,
    //         time: unit.time,
    //         battery_voltage: unit.battery_voltage,
    //         gps_validity: unit.gps_validity,
    //     };
    //     //console.log(dataSitrack);
    //     await axios.post(apiSitrack,dataSitrack)
    //     .then((response) =>{
    //         unit.id = unit.id
    //         unit.server = response.data.status
    //         //console.log("Respuesta del servidor", response.data.status);
    //         results.push(unit)
    //         return results

    //     })
    //     .catch((error) =>{
    //         //console.error("Error al hacer la solicitud: ", error.message);
    //         results.push(unit)
    //         return results
    //     })
    // }

    await Promise.all(
        units.map(async (unit) => {
            const dataSitrack = {
                imei_no: unit.imei_no,
                lattitude: unit.lattitude,
                longitude: unit.longitude,
                speed: unit.speed,
                angle: unit.angle,
                satellite: unit.satellite,
                time: unit.time,
                battery_voltage: unit.battery_voltage,
                gps_validity: unit.gps_validity,
            };
            try {
                const response = await axios.post(apiSitrack, dataSitrack);
                unit.id = unit.id;
                unit.server = response.data.status;
                results.push(unit);
            } catch (error) {
                console.error("Error al hacer la solicitud:", error.message);
                results.push(unit);
            }
        })
    );

    return results;

}

module.exports = sendInfoSitrack