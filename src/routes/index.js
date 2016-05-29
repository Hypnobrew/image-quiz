let express = require('express');
let router = express.Router();
let flickr = require('../handlers/flickr');
let data = require('../jsondata/data');
let math = require('../handlers/math');

router.get('/', function(req, res, next) {  
  var numberOfQuizItems = data.items.length;
  var randomIndex = math.getRandomInt(0, numberOfQuizItems - 1);
  
  var correctOption = data.items[randomIndex];
  var firstIncorrectOption = data.items[math.getRandomInt(0, numberOfQuizItems - 1)];
  var secondIncorrectOption = data.items[math.getRandomInt(0, numberOfQuizItems - 1)];

  flickr.getImage(correctOption.latin).then(function(imageUrl) {
    res.render('index', {
      title: 'Image quiz',
      image: imageUrl,
      options: [
        {
          'status' : 'correct',
          'latin' : correctOption.latin
        },
        {
          'status' : 'incorrect',
          'latin' : firstIncorrectOption.latin
        },
        {
          'status' : 'incorrect',
          'latin' : secondIncorrectOption.latin
        }
      ]
    });
  }).catch(function (error) {
    res.render(error);
  });
});

module.exports = router;