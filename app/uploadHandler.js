module.exports = (app) => {
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: './public/',
    filename: function(req, file, cb) {
      switch(file.mimetype) {
        case 'image/jpeg':
          ext = '.jpeg';
          break;
        case 'image/png':
          ext = '.png';
          break;
      }

      cb(null, file.originalname);
    }
  });
  const upload = multer({storage:storage});

  app.post('/upload', upload.single('file'), function(req, res, next) {
    if (req.file && req.file.originalname) {
      console.log(`Received file ${req.file.originalname}`);
    }

    res.send({ responseText: req.file.path});
  })
}
