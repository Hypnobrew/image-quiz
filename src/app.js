var express = require('express');
let request = require('request');
let path = require('path');
//let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const PORT = 8080;

let routes = require('./routes/index');
let app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

/*
app.get('/', function (req, res) {
  
  let api_key = '9e74d6b0a80f9d7eb393a09acc368aa3';
  let secret = '47344420b0fba66b';
  let searchTerm = 'flower';
  
  request(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&text=${searchTerm}&safe_search=1&per_page=10&format=json&nojsoncallback=1`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      
      let listOfImages = JSON.parse(body);
      if (listOfImages.stat != "ok"){
		    return;
	    }
      
      console.log(body);
      
      
      let photoId = listOfImages.photos.photo[0].id;
      
      
      request(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${api_key}&photo_id=${photoId}&secret=${secret}&format=json&nojsoncallback=1`, function (error, response, body) {
         if (!error && response.statusCode == 200) {
           let image = JSON.parse(body);
           if (image.stat != "ok"){
            res.send('Error');
		        return;
           }
           
           let url = image.photo.urls.url[0]._content;
           res.send(url);
         }
         else {
           res.send(body);
         }
      });
    }
    else {
      res.send(erro);
    }
  });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
*/