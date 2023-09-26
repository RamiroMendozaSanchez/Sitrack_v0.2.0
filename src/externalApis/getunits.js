const axios = require("axios");
require('dotenv').config();
const getsid = require('./getsid')
const getIdsBD = require('../services/getIdsBD');

async function getUnits() {
    var listUnits = [];
    const baseURL = process.env.BASE_URL_WIALON;
    var sid = await getsid();
    var obj = await getIdsBD();
    for (const idsArray of obj) {
        //console.log(idsArray.name);
        var ids = idsArray.ids
        for (const id of ids) {
            try {
                const response = await axios.get(
                    ` ${baseURL}?svc=core/search_item&params={"id":"${id}","flags":4611686018427387903}&sid=${sid}`
                )
                var datos = response.data
                var name = datos.item.nm;
                var imei = datos.item.uid;
                var utc = datos.item.pos.t;
                var timeUTC = returnTimeUTC(utc);
                var latitud = datos.item.pos.y;
                var longitud = datos.item.pos.x;
                var angle = datos.item.pos.c;
                var satellite = datos.item.pos.sc;
                var velocidad = datos.item.pos.s;
                var battery_voltage = "";
                var gps_valid = "";
                var bv =
                    "s_asgn1" in datos.item.lmsg.p
                        ? (battery_voltage = datos.item.lmsg.p.s_asgn1)
                        : "pwr_ext" in datos.item.lmsg.p
                            ? (battery_voltage = datos.item.lmsg.p.pwr_ext)
                            : (battery_voltage = "0");
                var gpsV =
                    "s_asgn4" in datos.item.lmsg.p
                        ? (gps_valid = datos.item.lmsg.p.s_asgn4)
                        : "valid" in datos.item.lmsg.p
                            ? (gps_valid = datos.item.lmsg.p.valid)
                            : "gps_valid" in datos.item.lmsg.p
                                ? (gps_valid = datos.item.lmsg.p.gps_valid)
                                : (gps_valid = "V");
                const gps_validity = "A";

                const dataSitrack = {
                    id:id.toString(),
                    imei_no: imei.toString(),
                    name : name.toString(),
                    time: timeUTC.toString(),
                    lattitude: latitud.toString(),
                    longitude: longitud.toString(),
                    angle: angle.toString(),
                    satellite: satellite.toString(),
                    speed: velocidad.toString(),
                    battery_voltage: battery_voltage.toString(),
                    gps_validity: gps_validity.toString(),
                  };
                  listUnits.push(dataSitrack)

            } catch (error) {
                console.error(error);
            }
        }
    }
    return listUnits;
}

function returnTimeUTC(utc) {
    var timeObj = new Date(utc * 1000);
    var time = timeObj.toISOString().replace(/[TZ]/g, "");
    var fechaString = time.substring(0, 10);
    var horaString = time.substring(10);
    var fecha = new Date(fechaString);

    var timeUTC = `${fechaString} ${horaString}`;
    return timeUTC;
}

module.exports = getUnits