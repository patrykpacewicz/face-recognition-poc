import Unirest from 'unirest/index.js';

export class FaceRecognitionLocalProxyClient {
  constructor() {
    this.url = 'http://localhost:3000/api/face/v1.0/detect';
  }

  detect = (imageUrl, responseOk, responseError = (body, status) => {}) => {
    Unirest
      .post(this.url)
      .headers({'Content-Type': "text/html"})
      .send(imageUrl)
      .end((response) => {
        if (response.status !== 200) { responseError(response.body, response.status); }
        else { responseOk(response.body); }
      });
  }
}

export class FaceRecognitionProjectOxfordClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.url = 'https://api.projectoxford.ai/face/v1.0/detect' +
        '?returnFaceId=false' +
        '&returnFaceLandmarks=false' +
        '&returnFaceAttributes=age,gender,smile,facialHair,glasses';
  }

  detect = (imageUrl, responseOk, responseError = (body, status) => {}) => {
    let data = imageUrl.toString();
    let str = data.substring(data.indexOf(",") + 1);

    Unirest
      .post(this.url)
      .headers({'Ocp-Apim-Subscription-Key': this.apiKey, 'Content-Type': "application/octet-stream"})
      .send(new Buffer(str, 'base64'))
      .end((response) => {
        if (response.status !== 200) { responseError(response.body, response.status); }
        else { responseOk(response.body); }
      });
  }
}
