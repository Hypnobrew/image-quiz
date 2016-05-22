let express = require('express');
let router = express.Router();
let flickr = require('../handlers/flickr');

router.get('/', function(req, res, next) {
  let imageUrl = flickr.getImage('flower', function(imageUrl) {
    res.render('index', { title: 'Image quiz', image: imageUrl }); 
  });
});

module.exports = router;