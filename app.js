var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.locals.pretty = true;

//우리가 설치한 jade 템플릿 엔진과 우리가 만드는 app의 프레임워크인 express를 연결하는 코드
app.set('view engine', 'jade'); 
app.set('views', './views');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

//form에 따라서 적당한 url을 자동으로 만들어 서버로 보내준다
app.get('/form', function(req, res){
    res.render('form');
});
app.get('form_receiver', function(req, res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);
});
app.post('/form_receiver', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+','+description);
})



//쿼리스트링을 Express에서 다루는 방법
//쿼리스트링은 app에게 정보를 전달할 때 사용하는 URL의 국제적인 표준
//전달된 값은 req영역. req.query.xxx를 통해서 가져올 수 있다.
app.get('/topic/:id', function(req, res){
    var topics = [
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ];
    var as = `
    <a href="topic?id=0">JavaScript</a><br>
    <a href="topic?id=1">Nodejs</a><br>
    <a href="topic?id=2">Express</a><br><br>
    ${topics[req.params.id]}
    `

    //res.send(req.query.id+','+req.query.name); //URL: localhost:3000/topic?id&name=egoing 구문
    res.send(topics[req.query.id]);
})
app.get('/topic/:id/:mode', function(req, res){
    res.send(req.params.id+','+req.params.mode)
})
app.get('/')
app.get('/template', function(req, res){
    //temp라는 템플릿을 호출(views디렉토리)해서 렌더링한 결과를 사용자에게 response하는 구문
    //,이후에 렌더할 객체?를 적어주면, temp.jade에서 사용이 가능하다
    res.render('temp', {time: Date(), _title:'Jade'}); 
})

app.get('/', function(req, res){
    res.send('Hello home page');
});
app.get('/dynamic', function(req, res){
    var lis = '';
    for(var i=0; i<5; i++){
        lis = lis + '<li>coding</li>';
    }

    var time = Date();
    var output = `
    <!DOCTYPE html>
    <html>
        <head>
         <meta charset="UTF-8">
         <title></title>
        </head>
        <body>
            Hello, Dynamic !
            <ul>
            ${lis}
            <ul>
            ${time}
        </body>
    </html>`
    res.send(output)
})
app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/route.png">')
})
app.get('/login', function(req, res){
    res.send('Login please');
})
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});