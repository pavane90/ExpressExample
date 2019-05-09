var express = require('express'); // セットアップ必要(npm install express)
var http = require('http'); // httpオブジェクト生成
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var app = express(); // express server object

app.set('port', process.env.PORT || 3000); // configure server port
app.use('/public',static(path.join(__dirname, 'public'))); //폴더의 패스를 static으로 불러올 수 있다.
//localhost:3000/cordova_bot.png

//post 데이터를 다룰때는 bodyParser로 처리가능
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser()); // 쿠키 컨트롤
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
})); // express-Session

var router = express.Router();

router.route('/process/product').get(function(req, res){
    console.log('process/product 라우팅 호출');
    if (req.session.user) {
        res.redirect('/public/product.html');
    } else {
        res.redirect('/public/login2.html');
    }
})

router.route('/process/login').post(function(req,res){
    console.log('process/login 라우팅 호출됨')
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log ('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    if (req.session.user) {
        console.log ('이미 로그인 되어 있네요');
        res.redirect('/public/product.html');
    } else {
        req.session.user = {
            id:paramId,
            name:'김',
            authorized:true
        };
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>로그인 성공</h1>');
        res.write('<p>Id : ' + paramId + '</p>');
        res.write('<br><br><a href="/public/product.html">상품 페이지로 이동하기</a>');
        res.end();
    }
});

router.route('/process/logout').get(function(req, res){
    console.log('/process/logout 호출')
    
    if(req.session.user){
        console.log('로그아웃합니다');
        
        req.session.destroy(function(err){
            if(err){
                console.log('세션 삭제 실패' + err);
                return;
            }

            console.log ('세션 삭제 성공');
            res.redirect('/public/login2.html');
        }); //세션내의 정보를 없애준다.
    } else {
        console.log('로그인 되어 있지 않습니다.');
        res.redirect('/public/login2.html');
    }
});


router.route('/process/setUserCookie').get(function(req, res){
    console.log('/process/setUserCookie 라우팅 함수 호출됨');

    res.cookie('user', {
        id:'mike',
        name:'girlsgeneration',
        authorized:true
    });

    res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req, res){
    console.log('/process/showCookie 라우팅 함수 호출됨');
    
    res.send(req.cookies);
});


router.route('/process/login').post(function(req, res){
    console.log('/process/login 라우팅 함수에서 받음');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
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