let NodeCache = require( "node-cache" );
let cache = new NodeCache();

module.exports.getCacheData = function(key) {
    return new Promise(function(resolve, reject) {
        let data = cache.get(key);
        if(data != undefined) {
            resolve(data);
            return;
        }
        reject('No cache key found');
    });
}

module.exports.setCacheData = function(key, value) {
    cache.set(key, value);
}