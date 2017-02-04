/**
* This method connects to a S3 bucket and sends back a list of all objects
* stored in that bucket. This is used to build an image gallery in
* the client side code.
**/
var Promise = require('promise');
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';

const S3_BUCKET = 'reactrekognition';
var s3 = new AWS.S3();

var getImages = function () {
  var params = {
    Bucket: S3_BUCKET,
    Delimiter: '',
  };

  return new Promise(function(resolve, reject) {
    s3.listObjects(params, function(err, data) {
        if (err){
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

module.exports = getImages;
