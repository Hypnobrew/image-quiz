let request = require('request');
let math = require('./math');
let credentials = request('../jsondata/credentials');
let baseUrl = 'https://api.flickr.com/services/rest/';

module.exports.getImage = function (searchTerm, callback) {
    let api_key = credentials.api_key;
    let secret = credentials.secret;
    
    request(`${baseUrl}?method=flickr.photos.search&api_key=${api_key}&text=${searchTerm}&safe_search=1&per_page=10&format=json&nojsoncallback=1`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let listOfImages = JSON.parse(body);
            let numberOfPhotos = listOfImages.photos.photo.length;
            let randomIndex = math.getRandomInt(0, numberOfPhotos - 1);
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