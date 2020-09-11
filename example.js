require('dotenv').config(); 
const getTodaysZoomInfo = require('./index.js');

getTodaysZoomInfo(process.env.USERNAME, process.env.PASSWORD).then((zoomInfo) => {
    if(zoomInfo.sucessful){
        console.log(`Meeting ID: ${zoomInfo.id}`);
        console.log(`Passcode: ${zoomInfo.password}`);
        console.log(`URL: ${zoomInfo.url}`);
    } else {
        console.log("No zoom info returned.");
    }
});
