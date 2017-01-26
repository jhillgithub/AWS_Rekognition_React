const express = require('express');
const app = express();
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2'
const S3_BUCKET = 'testreactrekognition'

const PORT = process.env.PORT || 3000;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
  bucket: S3_BUCKET,
  region: 'us-west-2',
  headers: {'Access-Control-Allow-Origin': '*'},
  ACL: 'private'
}));

app.use(express.static('public'));



app.listen(PORT, () => {
	console.log('server started on port: ', PORT);
});
