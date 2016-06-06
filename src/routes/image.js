let express = require('express');
let router = express.Router();
let flickr = require('../handlers/flickr');
let cache = require('../handlers/cache');

router.post('/new', function(req, res, next) {
  let imageName = req.body.name;
  res.setHeader('Content-Type', 'application/json');
  
  flickr.getImage(imageName).then(function(imageUrl) {
    res.send(JSON.stringify({ 
        url: imageUrl,
        success: true
    }));
  }).catch(function (error) {
    res.send(JSON.stringify({ 
        success: false
    }));
  });
});

router.post('/save', function(req, res, next) {
  let imageName = req.body.name;
  let imageUrl = req.body.url;
  res.setHeader('Content-Type', 'application/json');
  
  cache.getCacheData(imageName).then(function (data) {
    res.send(JSON.stringify({ 
        success: false,
        message: 'Cache key already exist'
    }));
  }).catch(function (data) {
    cache.setCacheData(imageName, imageUrl);
    res.send(JSON.stringify({ 
        success: true
    }));
  });
});

module.exports = router;