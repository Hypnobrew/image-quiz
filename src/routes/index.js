let express = require('express');
let router = express.Router();
let flickr = require('../handlers/flickr');
let data = require('../jsondata/data');
let math = require('../handlers/math');
let cache = require('../handlers/cache');

router.get('/', function(req, res, next) {
  
  let numberOfItems = 3;
  let indexes = math.getRandomInts(numberOfItems, 0, numberOfItems - 1);
  let correctIndex = math.getRandomInt(0, numberOfItems - 1);
  let correctOption = indexes[correctIndex];
  let options = [];
  
  for (let index in indexes) {
    let item = data.items[index];
    options.push({
      'status' : index == correctOption ? 'correct' : 'incorrect',
      'latin' : item.latin
    });
  }
    
  cache.getCacheData(data.items[correctOption].latin).then(function(cachedImageUrl) {
    res.render('index', {
      title: 'Image quiz',
      image: cachedImageUrl,
      imagename: data.items[correctOption].latin,
      options: options
    });
  }).catch(function (error) {
    flickr.getImage(data.items[correctOption].latin).then(function(imageUrl) {
      res.render('index', {
        title: 'Image quiz',
        image: imageUrl,
        imagename: data.items[correctOption].latin,
        options: options
      });
    }).catch(function (error) {
      res.render(error);
    });      
  });
});

module.exports = router;