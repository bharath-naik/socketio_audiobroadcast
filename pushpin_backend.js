var express = require('express'); 
const app = express();
var fs = require('fs');
var path = require('path');
var millisecondDelay = 10;
var readStream = fs.createReadStream(filepath); 

app.get('/', (req, res) => {
    res.set({
        'Content-Type': 'audio/webm',
        'Grip-Hold': 'stream',
        'Grip-Channel': 'myVlogs',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
        'Access-Control-Expose-Headers': 'Date',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': 9000
    });
    setTimeout(() => {  // just send defined millisecond audio
        res.status(200).send();
    }, millisecondDelay);
});
app.listen(8000);
console.log('streaming audio data now 8000');

/* CODE CODE CODE with initial file play
var express = require('express'); 
const app = express();
var fs = require('fs');
var path = require('path');
var filepath = path.join(__dirname, "red.webm");
var totalMillisecondsToSend = 1000;
var readStream = fs.createReadStream(filepath); 

app.get('/', (req, res) => {
    res.set({
        'Content-Type': 'audio/webm',
        'Grip-Hold': 'stream',
        'Grip-Channel': 'myVlogs',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
        'Access-Control-Expose-Headers': 'Date',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': 9000
    });
    readStream.pipe(res); // pipe readStream to response (via throttle). chunks will be gathered into res and sent at once
    setTimeout(() => {  // just send defined millisecond audio
        readStream.unpipe(res);
        res.status(200).send();
    }, totalMillisecondsToSend);
});
app.listen(8000);
console.log('streaming audio data now 8000');

*/
