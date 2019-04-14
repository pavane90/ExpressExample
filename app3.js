var express = require('express'); // セットアップ必要(npm install express)
var http = require('http'); // httpオブジェクト生成

var app = express(); // express server object

app.set('port', process.env.PORT || 3000); // configure server port

app.use(function(req, res, next){
    console.log('첫번째 미들웨어 호출됨.');

    req.user = 'mike';

    next();
}); //미들웨어를 등록한다.

app.use(function(req, res, next){
    console.log ('두번째 미들웨어 호출됨');
    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.end('<h1>서버에서 응답한 결과입니다. : ' + req.user + '</h1>');
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log ('express web server started : ' + app.get('port'));
}); //익스프레스를 이용해서 웹서버를 작성 