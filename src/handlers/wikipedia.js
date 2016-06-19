let request = require('request');
let bot = require('nodemw');

module.exports.getImage = function (searchTerm) {
    let imageSearch = `https://en.wikipedia.org/w/api.php?action=query&titles=${searchTerm}&prop=images&imlimit=20&redirects&format=json`;

    return new Promise(function(resolve, reject) {
        request(imageSearch, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let listOfImages = JSON.parse(body);
                let page = fetchFirstProperty(listOfImages.query.pages);

                if (page.images.length === 0) {
                    reject(Error('No images found'));
                    return;
                }

                let imageUrl = fetchFirstCorrectImage(page.images);
                if (imageUrl == '') {
                    reject(Error('No images found'));
                    return;
                }
                
                let specificImageInfo = `https://commons.wikimedia.org/w/api.php?action=query&titles=${imageUrl}&prop=imageinfo&iiprop=url&iiurlwidth=220&format=json`;
                request(specificImageInfo, function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        let imageInfo = JSON.parse(body);

                        let imageData = fetchFirstProperty(imageInfo.query.pages);
                        if (imageData.imageinfo.length == 0) {
                            reject('No images found');
                            return;
                        }                        

                        let externalImageUrl = imageData.imageinfo[0].thumburl;
                        resolve(externalImageUrl);
                    }
                    else {
                        reject(Error('Request could not be done'));
                    }
                });  
            }
            else {
                reject(Error('Error'));
            }
        });
    });
}

let fetchFirstProperty = function(json) {
    let returnNode = '';
    for (var property in json) {
        if (json.hasOwnProperty(property)) {
            returnNode = json[property];
            break;
        }
    }
    return returnNode;
}

let fetchFirstCorrectImage = function(imageArray) {
    let imageData = '';
    for (var image in imageArray) {
        let imageUrl = imageArray[image];
        if(imageUrl.title != 'File:Commons-logo.svg') {
            imageData = imageUrl.title;
            break;
        }
    }
    return imageData;
}