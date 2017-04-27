  const http = require('http');


  require('dotenv').config({
    silent: true
  });
  setupExpress = () => {
    const fileUpload = require('express-fileupload');
    const fs = require('fs');
    express = require('express');
    app = express();

    server = http.Server(app);

    app.use(express.static('public'));
    app.use(fileUpload());

    server.listen(process.env.PORT || 9999, () => {
      console.log(`listening on *:9999`);
    });



    app.get('/', (req, res) => {
      const pjson = JSON.parse(fs.readFileSync(require('path').join(__dirname, 'package.json'), 'utf8'));
      res.send({
        'simdax': 'rocks',
        'version': pjson.version
      });
    });


    app.post('/upload', (req, res) => {
      // res.redirect('/');
      const file = req.files.myfile;
      // console.log(file.data);

      const base64data = new Buffer(file.data).toString('base64');

      var options = {
        host: `api.github.com`,
        path: `/repos/pouyajoon/simdaxrocks/public/${file.name}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SIMDAX_ROCKS_GITHUB_TOKEN}`
        },
        body: {
          "content": base64data,
          "message": "wtf"
        }
      };

      console.log('GET', options);

      http.get(options, (a, b, c) => {
        console.log('STATUS', a, b, c);
        a.on('data', function(chunk) {
          //console.log('BODY: ' + chunk);
          str += chunk;
        });
        a.on('end', () => {
          console.log('No more data in response.');
          res.send('ok');
        });

      });



      // res.send(base64data);
    });
  }

  setupExpress();