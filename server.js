// Modules
var express = require(`express`);
const bodyParser = require('body-parser');
var path = require(`path`);
var fs = require('fs');


// Express Port/App Declaration
var PORT = process.env.PORT || 3000;
var app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var detectFace = require('./app/rekog');
var getImages = require('./app/listS3Objects');

// Routes
app.post('/rekog', function (req, res) {


  console.log(req.body.filename);

  detectFace(req.body.filename)
  .then(function(data) {
      console.log(data);
      fs.writeFile("./data.json", JSON.stringify(data), (err) => {
          if (err) {
              console.error(err);
              return;
          };
          console.log("File has been created");
      });
      res.json(data);
  });

});

app.get('/getimages', function (req, res) {
  getImages()
  .then(function(data) {
    console.log(data);
    res.json(data);
  });
});

app.get(`*`, function(req, res) {
  res.sendFile('public/index.html', { root: __dirname });
});

// Connection to PORT
app.listen(PORT, function() {
  console.log(`Listening On Port: ${PORT}`);
});
