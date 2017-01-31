// Modules
var express = require(`express`);
const bodyParser = require('body-parser');
var path = require(`path`);
var fs = require('fs');
var request = require('request-promise')
var _ = require('lodash');
var $ = require('jquery');
var Promise = require('bluebird');
var sign = require('./app/get_signed_url');
var multer = require('multer');

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

var base_url = "https://maker.ifttt.com/trigger/rekog/with/key/";
var url = base_url + process.env.IFTTT_API_KEY;

const emotionToColor = {
  'ANGRY': 'F44336',
  'CALM': '607D8B',
  'CONFUSED': 'FF9800',
  'DISGUSTED': '673AB7',
  'HAPPY': '4CAF50',
  'SAD': '2196F3',
  'SURPRISED': 'FFC107',
  'UNKNOWN': '616161',
};

// Routes
app.post('/rekog', function (req, res) {

  console.log(req.body.filename);

  var detectPromise =  detectFace(req.body.filename);

  var huePromise = detectPromise.then(function(faceData) {
    fs.writeFile("./data.json", JSON.stringify(faceData), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });
    var emotions = faceData.FaceDetails[0].Emotions;
    var maxConf = _.maxBy(emotions, 'Confidence');
    var maxEmotion = maxConf.Type;
    console.log("max emotion: ", maxEmotion);
    var color = emotionToColor[maxEmotion];

    console.log("url", url);

    var options = {
      method: 'POST',
      uri: url,
      body: {
        "value1": color
      },
      json: true
    };

    request(options);
    return "sent hue request for color: " + color;
  });

  return Promise.all([detectPromise, huePromise]).spread(function(faceData, hueData) {
    console.log("faceData: ", faceData);
    console.log("hueData: ", hueData);
    res.json(faceData);
  });


});

app.post('/sign', function (req, res) {
  sign(req.body.filename, req.body.filetype)
  .then(function(url) {
    res.json({signedUrl: url});
  })

  // console.log("sign: ", sign('req', 'image/png'));
  // res.send(sign())
});

// require('./app/uploadHandler')(app);
require('./app/multerS3')(app);

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
