var express = require('express'); // セットアップ必要(npm install express)
var http = require('http'); // httpオブジェクト生成
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');

var app = express(); // express server object

app.set('port', process.env.PORT || 3000); // configure server port
app.use('/public',static(path.join(__dirname, 'public'))); //폴더의 패스를 static으로 불러올 수 있다.
//localhost:3000/cordova_bot.png

//post 데이터를 다룰때는 bodyParser로 처리가능
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var router = express.Router();

router.route('/process/login').post(function(req, res){
    console.log('/process/login 라우팅 함수에서 받음');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead(200, {"Content-Type":"text/html;charser=utf8"});
    res.write("<h1>서버에서 로그인 응답</h1>");
    res.write("<div><p>" + paramId + "</p></div>");
    res.write("<div><p>" + paramPassword + "</p></div>");
    res.end();
});

app.use('/', router);

//app.use('/public', static(path.join(__dirname, 'public'))); 처럼 public폴더도 경로에 포함시킬 수 있다.

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log ('express web server started : ' + app.get('port'));
}); //익스프레스를 이용해서 웹서버를 작성 