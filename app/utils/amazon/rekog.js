/**
* This function will connect to AWS Rekognition and run a Deep Learning
* facial recognition algorithm on an image hosted in an S3 bucket.
* The service returns a json data structure with information about the
* facial features and emotions detected in the image.
**/
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
          console.log(err, err.stack);
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}

module.exports = detectFace;
