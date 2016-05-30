let getRandomInt = function(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

module.exports.getRandomInt = getRandomInt;

module.exports.getRandomInts = function(count, min, max) {
  let randomNumbers = []; 
  
  for (let i = 0; i < count; i++) {
    let random = getRandomInt(min, max);
    
    while(randomNumbers.includes(random)) {
      random = getRandomInt(min, max);
    }
    
    randomNumbers.push(random);
  }
  return randomNumbers;
}