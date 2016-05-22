let request = require('request');
let api_key = '9e74d6b0a80f9d7eb393a09acc368aa3';
let secret = '47344420b0fba66b';
let baseUrl = 'https://api.flickr.com/services/rest/';

module.exports.getImage = function (searchTerm, callback) {
    request(`${baseUrl}?method=flickr.photos.search&api_key=${api_key}&text=${searchTerm}&safe_search=1&per_page=10&format=json&nojsoncallback=1`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let listOfImages = JSON.parse(body);
            let numberOfPhotos = listOfImages.photos.photo.length;
            let randomIndex = getRandomInt(0, numberOfPhotos - 1);
            let photoId = listOfImages.photos.photo[randomIndex].id;
            
            request(`${baseUrl}?method=flickr.photos.getInfo&api_key=${api_key}&photo_id=${photoId}&secret=${secret}&format=json&nojsoncallback=1`, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let image = JSON.parse(body);
                    if (image.stat != "ok"){
		                callback('error');
                    }
                    
                    let photo = `https://farm${image.photo.farm}.staticflickr.com/${image.photo.server}/${image.photo.id}_${image.photo.secret}_m.jpg`;
                    callback(photo);
                }
                else {
                    callback('error');
                }    
            });
        }
        else {
            callback('error');
        }
    });
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}