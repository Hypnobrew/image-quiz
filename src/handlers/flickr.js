let request = require('request');
let math = require('./math');
let credentials = require('../jsondata/credentials');
let baseUrl = 'https://api.flickr.com/services/rest/';

module.exports.getImage = function (searchTerm) {
    let api_key = credentials.api_key;
    let secret = credentials.secret;
    
    return new Promise(function(resolve, reject) {
        let imagesUrl = `${baseUrl}?method=flickr.photos.search&api_key=${api_key}&text=${searchTerm}&safe_search=1&per_page=10&format=json&nojsoncallback=1`;
            
        request(imagesUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let listOfImages = JSON.parse(body);
                let numberOfPhotos = listOfImages.photos.photo.length;
                let randomIndex = math.getRandomInt(0, numberOfPhotos - 1);
                let photoId = listOfImages.photos.photo[randomIndex].id;
                let specificImageUrl = `${baseUrl}?method=flickr.photos.getInfo&api_key=${api_key}&photo_id=${photoId}&secret=${secret}&format=json&nojsoncallback=1`;
                
                request(specificImageUrl, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        let image = JSON.parse(body);
                        if (image.stat != "ok"){
                            reject(Error('Error'));
                        }
                        
                        let photo = `https://farm${image.photo.farm}.staticflickr.com/${image.photo.server}/${image.photo.id}_${image.photo.secret}_m.jpg`;
                        resolve(photo);
                    }
                    else {
                        reject(Error('Error'));
                    }    
                });
            }
            else {
                reject(Error('Error'));
            }
        });
    });
};