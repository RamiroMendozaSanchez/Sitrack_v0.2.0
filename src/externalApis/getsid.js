const axios = require("axios");
const path = require('path');
require('dotenv').config({ path: './config/.env' });

async function getSid() {
    const token = process.env.TOKEN_WIALON;
    const baseURL = process.env.BASE_URL_WIALON;
    console.log(token);
    console.log(baseURL);
    try {
        const response = await axios.get(
            `${baseURL}?svc=token/login&params={ "token":"${token}"}`
        );
        
        var sid = response.data.eid;
        console.log(sid);
        return sid
    } catch (error) {
    }
}

module.exports = getSid;