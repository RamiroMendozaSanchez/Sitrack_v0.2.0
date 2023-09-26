const getSid = require("./getsid");
const readGroups = require("../services/readGroups");
const axios = require("axios");
const path = require('path');
require('dotenv').config();

async function getId() {
    const baseURL = process.env.BASE_URL_WIALON;
    var listIds = [];
    var sid = await getSid();
    var grupos = '';
    var name = 0;
    var ids = [];
    try {
        const gruposObtenidos = await readGroups();
        grupos = gruposObtenidos
    } catch (error) {
        console.error('Error en la función principal:')
    }

    for (const grupo of grupos) {
        try {
            const response = await axios.get(`${baseURL}?svc=core/search_items&params=
            {"spec":{"itemsType":"avl_unit_group","propName":"sys_name","propValueMask":"${grupo.name}*","sortType":"sys_name","propType":"property"},
            "force":1,"flags":1,"from":0,"to":0}&sid=${sid}`);
            const items = response.data.items;
            for (const item of items) {
                 ids = item.u
                 name= item.nm
                 const arrayDataIds = {
                    name:name,
                    ids:ids
                 }
                 listIds.push(arrayDataIds)
            }
        } catch (error) {
            
        }
    }
    console.log(listIds);
    return listIds;
    
}

module.exports = getId;