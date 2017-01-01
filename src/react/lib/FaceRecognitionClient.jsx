export class FaceRecognitionLocalProxyClient {
  constructor() {
    this.url = '/proxy/face/v1.0/detect' +
        '?returnFaceId=false' +
        '&returnFaceLandmarks=false' +
        '&returnFaceAttributes=age,gender,smile,facialHair,glasses';
  }

  detect = (imageUrl, responseOk, responseError = (body, status) => {}) => {
    let data = imageUrl.toString();
    let str = data.substring(data.indexOf(",") + 1);

    fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': "application/octet-stream" },
      body: new Buffer(str, 'base64')
    }).then((response) => {
      response.json().then((json) => {
        if (response.status !== 200) { responseError(json, response.status); }
        else { responseOk(json); }
      }).catch( (error) => responseError(error, -1));
    }).catch( (error) => responseError(error, -2));
  }
}
