var detectFace = require('./rekog');
var Promise = require('bluebird');
var request = require('request-promise')
var _ = require('lodash');

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

module.exports = (app) => {
  const multer = require('multer');
  var fs = require('fs');
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2'
  const BUCKET = 'reactrekognition'

  var photoBucket = new AWS.S3({params: {Bucket: BUCKET}});

  function uploadToS3(file, callback) {
      photoBucket
          .upload({
              ACL: 'public-read',
              Body: fs.createReadStream(file.path),
              Key: file.originalname,
              ContentType: 'application/octet-stream'
          })
          .send(callback);
  }

  const storage = multer.diskStorage({
    destination: './public/',
    filename: function(req, file, cb) {
      switch(file.mimetype) {
        case 'image/jpeg':
          ext = '.jpeg';
          break;
        case 'image/png':
          ext = '.png';
          break;
      }

      cb(null, file.originalname);
    }
  });
  const upload = multer({storage:storage});
  app.post('/upload', upload.single('file'), function (req, res) {

    if (req.file && req.file.originalname) {
      console.log(`Received file ${req.file.originalname}`);
    }

    uploadToS3(req.file, function (err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('failed to upload to s3').end();
        }
        console.log("data from s3", data.key);

        var detectPromise =  detectFace(data.key);
        var huePromise = detectPromise.then(function(faceData) {
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
        // res.send({ responseText: data.Location.replace(/"/g, '&quot;')});
    });
  });

}
