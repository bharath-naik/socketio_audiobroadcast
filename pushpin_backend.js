var express = require('express'); 
const app = express();
var fs = require('fs');
var path = require('path');
var filepath = path.join(__dirname, "red.webm");
var totalMillisecondsToSend = 1000;
var readStream = fs.createReadStream(filepath, {highWaterMark: chunkSizeKB*1024}); 

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
        readStream.pipe(throttle).unpipe(res);
        readStream.unpipe(throttle);
        res.status(200).send();
    }, totalMillisecondsToSend);
});
app.listen(3000);
console.log('streaming audio data now 8000');
