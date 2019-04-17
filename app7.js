var express = require('express'); // セットアップ必要(npm install express)
var http = require('http'); // httpオブジェクト生成
var static = require('serve-static');
var path = require('path');

var app = express(); // express server object

app.set('port', process.env.PORT || 3000); // configure server port
app.use(static(path.join(__dirname, 'public'))); //폴더의 패스를 static으로 불러올 수 있다.
//localhost:3000/cordova_bot.png

//app.use('/public', static(path.join(__dirname, 'public'))); 처럼 public폴더도 경로에 포함시킬 수 있다.

app.use(function(req, res, next){
    console.log('첫번째 미들웨어 호출됨.');

    var userAgent = req.header('User-Agent');
    var paramName = req.query.name; // 파라미터에 있는 name값을 읽을 수 있다.

    res.send('<h3>서버에서 응답. User-Agent -> ' + userAgent + '</h3><h3>Param Name -> ' + paramName + '</h3>');
    // http://localhost:3000/?name=mike

    // get 방식은 req.query.parameter 식으로 값을 읽을 수 있다.
    // post 방식은 req.body.parameter 식으로 값을 읽을 수 있다.

}); //미들웨어를 등록한다.

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log ('express web server started : ' + app.get('port'));
}); //익스프레스를 이용해서 웹서버를 작성 