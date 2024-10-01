const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0ZpL0FjTHovWmdMK09aa0ZmZzlCNGhnd0hodEhTSHRrQldYc1pOcjJsRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiam5EQ2tNbzJPclFvOWQzVzcxRklWRUV4V2dwcDhnVldjeXRZajhTUmZoYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRXlpcmM5T0RyMEdzeHY2NE12K2ZlMXhuOHBaS2dQS0dJdXRXRmREUkUwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2QVRvQ3BEeEo3Ymx5bFFGRngyY0dUK2xLR1liR2E1RkNrNFhLcDM3K0ZnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdDaFJSbG1tZjh3bUFpbWtaYWN6b2JsZ1l2eG5ScXdwNC9ZaUx2OHl0VTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5nYTdTekFGZjRmcHJLeVQ1YzlPK3hRbC9rRUxGTVRaaGRwcFNFQjFjRHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkpmNVpHZDkzcHIvdDBrVVBxWlJJYklsc0hsblI2WkJNalFzQVJFOUFrND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib01YVkwvOXJlUFFYRlJ5a3VuK3d2ajJuNFNnYjNOTFVPYVYvVFFCSjFFVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVSTHJpMis3aWZxZDU1V2w4a09lRTdCci9iZFhCQlVsRW11NnpNL2tCcFN3ZC9xRE5EN2J1SU56SUhKWlM3RDRwdlhMcGl4OGtGRHVMUGZaTklOZ2dnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJkbklWYlpVc1hBdjg4SXFrcEx6TnZqUlJLRlBzWjRXbmRraVN6S1h4NmxNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ5QktVa3hXX1JzbW5MeHBnODdzTG1nIiwicGhvbmVJZCI6IjgzMGQ1MWI2LTAxNjgtNDJiZS04OTg4LTQ1MGEzNGZkOGQ4NSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6OFoxMGFjUk1ETk9zVFpHcEdTNFdvRmFSY1E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidDdDYUtweTJwNEhGVEhrREF5eDkxK2hnMHBFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBQUVlRQVZaIiwibWUiOnsiaWQiOiI5NDc3MzgyNDI2Njo3OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiIuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxu8JKNmSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHFlcDZFSEVNbkI3N2NHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiT1ZCb25XVHNnMUY5Q1BjaEZoc2hXT1NPQmZyUjgzTWJDclN0NVB1aTVHOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTGlORWhrTThzNjVjS0pWcUF1MHFCeHMvRnlMek50ZnFCSlYxMTZzUHg1L0prSG5JeG1EWWkyTFVJbm5OU0N5djE3ZVFHVEZLek40U08vNG9CK3lFQXc9PSIsImRldmljZVNpZ25hdHVyZSI6IktLSkk2OHhSRmJ3NXVRTVJ6NnNLK3FVV2VRVDZLU1ZXaFk4ZG1nejQ4UnFoeGhPTysxb0V5RHAzMnN4STM3Y0ZNdEtmd0lVRHYxbXlMN3VYWTVRZWpBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NzM4MjQyNjY6NzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVGxRYUoxazdJTlJmUWozSVJZYklWamtqZ1g2MGZOekd3cTByZVQ3b3VSdiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNzc4MzEyNn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "soVidu",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " soVidu",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || '𝐬𝐨𝐕𝐈𝐝𝐮-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
