/**
* This function will reach out to S3 and get a signed URL to sendFile
* back to the client. This allows the client to temporarily upload a file
* to S3 using the signed URL. The url is currently set to expire after 60 seconds
* @TODO: setup CORS in S3 to only allow this access from an approved domain.
* Need to wait until this node server is hosted on AWS or Heroku.
**/
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
                console.log(err, err.stack);
                reject(err);
              } else {
                console.log("received data from rekog: ", JSON.stringify(data, null, 2));
                resolve(data);
              }
            }
          );
        });
    }

module.exports = sign;
