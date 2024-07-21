const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0FLL2dkVzRnaXdqeW1yb01RNmR1MjhLSjg3U0h4dlE2WXNXR3BrTW1GTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMGdvV2E2cDcwUXgrN20yY3JlTXhCSXdWYXFHNkFkeW41NWlTMDlNQW13ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHUHRTaWhiUlJXcnNqT1o0T0FJMTZuNnlicWJzeEU1Z092NnJEUExJNW1jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4L2FxLzdReTByWFEzbmVTbnhWK3B1VDUxZmlnb2dlRmZDQjdXT2lOckE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVFMXRtK1YrbUFGQ3JyOHhZVXRFR1RYUnVnSDJ0ZGN1SkdHQmVmaS9HR2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1yMFV1bkpUam1mUmlvODIxRmVwQndUQ3RITElyQVdmV2JoUkl5a3JHajQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0FTRzlnSGF6VWo0SmhHWHBvMTdoOXRYdEJ2VktlcVFCKzR1VWZPQk4zST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVjBYbnE1MXZTL011dy9IZ3pQTU4yZFdZeTc1SzJwRkRCMEwxRjlOTU0zWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJrZis1bmo2bFVVN1ZUaTBadzlXRm1yakJKSGlFWFl2M05LM0I2TXF5c1dIVTc1UkQ1a2VqaGdQSkFVV3pxeXFGSFNXVHV3SytZTWNwek41QVBKWWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIsImFkdlNlY3JldEtleSI6ImdxNGJ4aVhNU2pPcW80YXd1VStPbXpub0kwOFZpMWZmVEprT052blBuc289IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImVqWUNDODZiU0plY21zTF9JRkdOUGciLCJwaG9uZUlkIjoiN2Q0NTU4M2MtZjY4Ni00NzI2LWJhMzQtYTAyNjk5MGNmNzIzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilo0MEJOa1pReWZtdlVLNHNGbjRjVHYreTFWYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTN1dRalFzaEtCa2g4NEV4UUR3WXVWdDIwams9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRzVHU0xITEMiLCJtZSI6eyJpZCI6IjI1NDc1Nzg4OTQ3NjoyOUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSnF1M0trQkVNU3Q5TFFHR0EwZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiT2Zwb0FsZDZqazczL1J3NW1kQ05GUXJ6MGZ5M0l5TUp3UTFRaUdKMHNTST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQ2FJVUFBU1pYZjEzQU5MWmttREJrL0k0VWhUOFhSK2RFZ0Rnb1NybGVNc3ROb3VKeWJLWnhESUU0azdqTnN1aEkrYTJQUE5BOFNTZjVNaWc5dmVzQVE9PSIsImRldmljZVNpZ25hdHVyZSI6Ikh4a2E3RzlCek9yWVBWV0xJdXhZeUh4SmlOa0h6VW9sOGt5QnZITXl3Qkg5VVdCOU05aytCTUhXQXFlR2JBUkdSOCtpbWNtTkU3bWM4bS9yb24xYWdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzU3ODg5NDc2OjI5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRuNmFBSlhlbzVPOS8wY09ablFqUlVLODlIOHR5TWpDY0VOVUloaWRMRWkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE1NzEwMjUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQkxxIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
