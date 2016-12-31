import Unirest from 'unirest/index';

export class FaceRecognitionLocalProxyClient {
  constructor() {
    this.url = '/api/face/v1.0/detect';
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
