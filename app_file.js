var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs'); //file system
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //post방식, bodyparser 캐치
app.locals.pretty = true; //jade 정리

app.set('views', './views_file');
app.set('view engine', 'jade');
app.get('/topic/new', function(req, res) {
    fs.readdir('data', function(err, files) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', { topics:files });
    });   
});
app.get(['/topic', '/topic/:id'], function(req, res) {
    fs.readdir('data', function(err, files) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id) {
            //id값이 있을 때
            fs.readFile('data/'+id, 'utf8', function(err, data) {
                if(err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics: files, title:id, description: data}); 
            })
        } else {
            //id값이 없을 때
            //render함수: 첫번째인자- 템플릿파일의 이름. 두번째- 템플릿 파일안에 주입할 데이터를 객체에 담아서 주입한다
            res.render('view', { topics:files, title:'welcome', description:'Hello, JavaScript for server.' }); 
        }        
    })
})

app.post('/topic', function(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });
})

app.listen(3000, function() {
    console.log('Connected, 3000 port!');

})