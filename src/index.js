let express = require('express');
const PORT = 8080;

let app = express();
app.get('/', function (req, res) {
  res.send('Start of LearnQuiz\n');
  console.log(req);
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);