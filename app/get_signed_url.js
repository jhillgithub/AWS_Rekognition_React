var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2'
const BUCKET = 'testreactrekognition'

exports = module.exports = {
    sign: function(filename, filetype) {
        var s3 = new aws.S3();

        var params = {
            Bucket: BUCKET,
            Key: filename,
            Expires: 60,
            ContentType: filetype
        };

        s3.getSignedUrl('putObject', params, function(err, data) {
            if (err) {
                console.log(err);
                return err;
            } else {
                return data;
            }
        });
    }
};
