setupExpress = () => {
  const fs = require('fs');
  express = require('express');
  app = express();
  http = require('http').Server(app);
  app.use(express.static('public'));

  http.listen(process.env.PORT || 9999, () => {
    console.log(`listening on *:9999`);
  });

  app.get('/', function(req, res) {
    const pjson = JSON.parse(fs.readFileSync(require('path').join(__dirname, 'package.json'), 'utf8'));
    res.send({
      'simdax': 'rocks',
      'version': pjson.version
    });
  });


  app.post('/', function(req, res) {
    const pjson = JSON.parse(fs.readFileSync(require('path').join(__dirname, 'package.json'), 'utf8'));
    res.send({
      'simdax': 'rocks',
      'version': pjson.version
    });
  });  
}

setupExpress();