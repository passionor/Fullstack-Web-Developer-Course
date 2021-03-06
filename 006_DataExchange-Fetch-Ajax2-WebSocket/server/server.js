const http = require('http');
const multiparty = require('multiparty');

http.createServer((req, res) => {
  if(req.method == 'POST' && req.url == '/') {
    let form = new multiparty.Form({
      uploadDir: './upload'
    });
    
    form.parse(req);
    
    form.on('field', (name, value) => {
      console.log('field:', name, value);
    });
    form.on('file', (name, file) => {
      console.log('file:', name, file);
    });
    
    form.on('close', () => {
      console.log('Done');
      res.setHeader('access-control-allow-origin', '*');
      res.end();
    });
  }
}).listen(8080);