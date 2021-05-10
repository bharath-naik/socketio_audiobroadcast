var http = require('http');
var fs = require('fs');
var path = require('path');
var Throttle = require('throttle');
http.createServer(function (req, res) {
var filepath = path.join(__dirname, "red.webm");
var chunkSizeKB=1/2; //should be exponent of 2
totalKBtoSend=128; //should be exponent of 2
var totalChunksToSend=Math.floor(totalKBtoSend/chunkSizeKB);
var readStream = fs.createReadStream(filepath, {highWaterMark: chunkSizeKB*1024}); 
const bitRate = 32000; // bitRate in kbps
const throttle = new Throttle(bitRate/8);

    res.writeHead(200, {
        'Content-Type': 'audio/webm',
        'Grip-Hold': 'stream',
        'Grip-Channel': 'myVlogs',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
        'Access-Control-Expose-Headers': 'Date',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': 9000
    });

    var count = 0; //get count of which chunk is ready

    readStream.pipe(throttle).on("data", chunk => {
        // readStream.destroy();
        res.write(chunk); // write chunk in the response
    })
  .on('end', function () {
        // This may not been called since we are destroying the stream
        // the first time 'data' event is received
        readStream.destroy();
        console.log('All the data in the file has been read');
    })
    .on('close', function (err) {
        console.log('Stream has been destroyed and file has been closed');
      res.end();
    });
}).listen(8000);
console.log('streaming audio data now 8000');

/*
var express = require('express'); 
const app = express();
var fs = require('fs');
var path = require('path');
var filepath = path.join(__dirname, "test.webm");
var totalMillisecondsToSend = 100;
var readStream = fs.createReadStream(filepath); 

app.get('/', (req, res) => {
  console.log("new request received")
    res.set({
        'Content-Type': 'audio/webm',
        'Grip-Hold': 'stream',
        'Grip-Channel': 'myVlogs',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
        'Access-Control-Expose-Headers': 'Date',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': 0
          });
    readStream.pipe(res); // pipe readStream to response (via throttle). chunks will be gathered into res and sent at once
    setTimeout(() => {  // just send defined millisecond audio
        readStream.unpipe(res);
        readStream.destroy();
        res.end();
    }, totalMillisecondsToSend);
});
app.listen(8000);
console.log('streaming audio data now 8000');
*/
