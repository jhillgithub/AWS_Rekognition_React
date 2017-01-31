var Promise = require('promise');
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2'
const BUCKET = 'reactrekognition'

var sign = function(filename, filetype) {
        var s3 = new AWS.S3();

        var params = {
            Bucket: BUCKET,
            Key: filename,
            Expires: 60,
            ContentType: filetype
        };

        return new Promise(function(resolve, reject) {
          s3.getSignedUrl('putObject', params, function(err, data) {
              if (err){
                console.log(err, err.stack); // an error occurred
                reject(err);
              } else {
                // console.log(JSON.stringify(data, null, 2)); // successful response
                console.log("received data from rekog: ", JSON.stringify(data, null, 2));

                resolve(data);
              }
            }
          );
        });



    }

module.exports = sign;
