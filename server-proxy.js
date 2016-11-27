import { FaceRecognitionProjectOxfordClient } from './src/lib/FaceRecognitionClient'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const client = new FaceRecognitionProjectOxfordClient(process.env.API_KEY);

app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.text({ type: 'text/html' }));

app.post('/api/face/v1.0/detect', (req, res) => {
  client.detect(req.body, (data) => {
    console.log("Body: " + JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  }, (response) => {
    console.error(`Error with response code: ${response.status} body: ${JSON.stringify(response.body)}`);
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server on: http://localhost:${app.get('port')}/`);
});
