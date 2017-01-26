const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const get_signed_url = './app/get_signed_url';


const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// app.use('/posts', posts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


app.get('/api/v1/getsignedurl', function(req, res) {
  console.log("req body", req.body);
  // get_signed_url(req.body.filename, req.body.filetype)
})


app.listen(PORT, () => {
	console.log('server started on port: ', PORT);
});
