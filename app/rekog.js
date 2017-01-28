var Promise = require('promise');
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';

const S3_BUCKET = 'reactrekognition';
var rekognition = new AWS.Rekognition();



var detectFace = function (image_file_name) {
  var params = {
      Image: {
          S3Object: {
              Bucket: S3_BUCKET,
              Name: image_file_name
          }
      },
      Attributes: ['ALL']
  };

  return new Promise(function(resolve, reject) {
    rekognition.detectFaces(params, function(err, data) {
        if (err){
          console.log(err, err.stack); // an error occurred
          reject(err);
        } else {
          // console.log(JSON.stringify(data, null, 2)); // successful response
          console.log("typeof", typeof(data));
          resolve(data);
        }
      }
    );
  });


}

module.exports = detectFace;
