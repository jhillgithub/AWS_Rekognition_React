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
    destination: '../../../public/',
    filename: function(req, file, cb) {
      switch(file.mimetype) {
        case 'image/jpeg':
          ext = '.jpg';
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
        res.send({ selected_file: data.key });
    });
  });

}
