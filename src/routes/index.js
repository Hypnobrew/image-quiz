let express = require('express');
let router = express.Router();
let flickr = require('../handlers/flickr');
let data = require('../jsondata/data');
let math = require('../handlers/math');
let cache = require('../handlers/cache');

router.get('/', function(req, res, next) {
  
  let numberOfItems = 3;
  let indexes = math.getRandomInts(numberOfItems, 0, data.items.length -1);
  let electedCorrectItem = math.getRandomInt(0, numberOfItems - 1);
  let electedCorrectIndex = indexes[electedCorrectItem];
  let electedCorrectData = data.items[electedCorrectIndex];
  let options = [];
  
  for (let index in indexes) {
    let imageIndex = indexes[index];
    let option = data.items[imageIndex];
    options.push({
      'status' : imageIndex == electedCorrectIndex ? 'correct' : 'incorrect',
      'name': option.name,
      'latin' : option.latin
    });
  }
    
  cache.getCacheData(electedCorrectData.latin).then(function(cachedImageUrl) {
    res.render('index', {
      title: 'Image quiz',
      image: cachedImageUrl,
      imagename: electedCorrectData.latin,
      options: options
    });
  }).catch(function (error) {
    flickr.getImage(electedCorrectData.latin).then(function(imageUrl) {
      res.render('index', {
        title: 'Image quiz',
        image: imageUrl,
        imagename: electedCorrectData.latin,
        options: options
      });
    }).catch(function (error) {
      res.render(error);
    });      
  });
});

module.exports = router;