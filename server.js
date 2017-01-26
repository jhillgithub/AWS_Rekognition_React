const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const get_signed_url = './app/get_signed_url';
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2'
const S3_BUCKET = 'testreactrekognition'

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// app.use('/posts', posts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


app.get('/api/v1/getsignedurl', function(req, res) {
  var S3_BUCKET = 'images_upload'

  var s3 = new AWS.S3()
  var options = {
    Bucket: S3_BUCKET,
    Key: req.query.file_name,
    Expires: 60,
    ContentType: req.query.file_type,
    ACL: 'public-read'
  }

  s3.getSignedUrl('putObject', options, function(err, data){
    if(err) return res.send('Error with S3')

    res.json({
      signed_request: data,
      url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name
    })
  })
})


app.listen(PORT, () => {
	console.log('server started on port: ', PORT);
});
