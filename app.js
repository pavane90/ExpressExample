var express = require('express'); // セットアップ必要(npm install express)
var http = require('http'); // httpオブジェクト生成

var app = express(); // express server object

app.set('port', process.env.PORT || 3000); // configure server port

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log ('express web server started : ' + app.get('port'));
}); //익스프레스를 이용해서 웹서버를 작성