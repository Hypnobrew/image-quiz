let express = require('express');
let router = express.Router();
let flickr = require('../handlers/flickr');
let data = require('../jsondata/data');
let math = require('../handlers/math');

router.get('/', function(req, res, next) {  
  var numberOfQuizItems = data.items.length;
  var randomIndex = math.getRandomInt(0, numberOfQuizItems - 1);
  var item = data.items[randomIndex];
  
  flickr.getImage(item.latin).then(function(imageUrl) {
    res.render('index', { title: 'Image quiz', image: imageUrl }); 
  }).catch(function (error) {
    res.render(error);
  });
});

module.exports = router;