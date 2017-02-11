module.exports = (app) => {
  var uuid = require('node-uuid');
  const multer = require('multer');
  var fs = require('fs');
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';
  const BUCKET = 'reactrekognition';

  var upload = multer({ storage: multer.memoryStorage({}) })
  app.post('/upload/base64', upload.single('file'), function (req, res) {
    // console.log(req);
    // res.end();

    // var buf = new Buffer(req.body.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64');
    var buf = new Buffer(req.body.imageBinary.replace(/^data:image\/jpeg;base64,/, ""),'base64');
    console.log("buf", buf);
    const filename = "webcam_" + uuid.v1() + ".jpg";
    s3Params = {
      Key: filename,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    };
    fs.writeFile('./public/uploads/' + filename, buf, 'base64', function (err) {
      if (err) return next(err)
    });

    var s3Bucket = new AWS.S3( { params: {Bucket: BUCKET} } );
    s3Bucket.putObject(s3Params, function(err, data){
          if (err) {
            console.log(err);
            console.log('Error uploading data: ', s3Params);
          } else {
            console.log('succesfully uploaded the image!');
            res.send({ selected_file: filename})
          }
      });
  });

}
