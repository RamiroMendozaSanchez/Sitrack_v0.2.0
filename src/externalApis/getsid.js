const axios = require("axios");
const path = require('path');
require('dotenv').config();

async function getSid() {
    const token = process.env.TOKEN_WIALON;
    const baseURL = process.env.BASE_URL_WIALON;
    try {
        const response = await axios.get(
            `${baseURL}?svc=token/login&params={ "token":"${token}"}`
        );
        
        var sid = response.data.eid;
        return sid
    } catch (error) {
    }
}

module.exports = getSid;