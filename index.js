  const http = require('http');
  var fetch = require('node-fetch');


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


      // fs.writeFileSync(file, content, 'utf8');

      const base64data = new Buffer(file.data).toString('base64');


      fetch(`http://api.github.com/repos/pouyajoon/simdaxrocks/contents/public/files/${file.name}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SIMDAX_ROCKS_GITHUB_TOKEN}`
          },
          body: JSON.stringify({
            "content": base64data,
            "message": "wtf"
          })
        })
        .then(function(res2) {
          return res2.json();
        }).then(function(json) {
          console.log(json);
          res.send(json);
        }).catch(e => {
          console.error(e)
          res.send(e);
        });

    });
  }

  setupExpress();