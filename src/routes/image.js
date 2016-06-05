let express = require('express');
let router = express.Router();
let flickr = require('../handlers/flickr');

router.post('/new', function(req, res, next) {
  
  var imageName = req.body.name;
  
  flickr.getImage(imageName).then(function(imageUrl) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 
        url: imageUrl,
        success: true
    }));
  }).catch(function (error) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 
        success: false
    }));
  });
});

module.exports = router;