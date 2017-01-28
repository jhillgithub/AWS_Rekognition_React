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
};

module.exports = getImages;
