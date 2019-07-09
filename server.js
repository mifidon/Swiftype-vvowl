var request = require("request");

const express = require('express');

const app = express();


// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//get all documents with limit of 1000
app.get('/getDocuments/', (req, res) => {

  var options = { method: 'GET',
    url: 'https://api.swiftype.com/api/v1/engines/service-suche/document_types/services/documents.json',
    qs: { auth_token: req.query.apikey,
	  per_page: 1000 },
    headers:
     {'cache-control': 'no-cache' } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(response)
    });

});
//delete document with specific external_id
app.get('/deleteDocument/', (req, res) => {
  var options = { method: 'DELETE',
    url: 'https://api.swiftype.com/api/v1/engines/service-suche/document_types/services/documents/'+req.query.id,
    qs: { auth_token: req.query.apikey },
    headers:
     { 'cache-control': 'no-cache',
       'Accept': 'application/json'  } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(response)
});

});

//create or update document with specific external_id
app.get('/sendDocument/', (req, res) => {
  var options = { method: 'POST',
  url: 'https://api.swiftype.com/api/v1/engines/service-suche/document_types/services/documents/create_or_update.json',
  headers:
   { 'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body:
   { auth_token: req.query.apikey,
     document:
      { external_id: req.query.id,
        fields:
         [ { name: 'title',
             value: req.query.title,
             type: 'string' },
           { name: 'name',
             value: req.query.name,
             type: 'string' },
           { name: 'url',
             value: req.query.url,
             type: 'string' },
           { name: 'section',
             value: req.query.section,
             type: 'string' } ,
             { name: 'alexa_response',
               value: req.query.alexa_response,
               type: 'string' }] } },
  json: true };

  request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(response)
  // TODO: entfernen
  console.log(body);
  });

});
