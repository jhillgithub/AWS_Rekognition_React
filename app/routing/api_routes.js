// ===============================================================================
// ROUTING
// ===============================================================================
var multer = require('multer');

var sign = require('../utils/amazon/get_signed_url');
var detectFace = require('../utils/amazon/rekog');
var getImages = require('../utils/amazon/listS3Objects');

module.exports = function (app) {

  app.post('/rekog', function (req, res) {
    var detectPromise =  detectFace(req.body.filename)
    .then(function(rekog_response) {
      res.json(rekog_response);
    });
  });

  app.post('/sign', function (req, res) {
    sign(req.body.filename, req.body.filetype)
    .then(function(url) {
      res.json({signedUrl: url});
    });
  });

  require('../utils/amazon/multerS3')(app);

  app.get('/getimages', function (req, res) {
    getImages()
    .then(function(data) {
      console.log(data);
      res.json(data);
    });
  });
};
