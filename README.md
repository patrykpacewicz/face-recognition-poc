face-recognition-poc
====================
I was asked to check how difficult it will be to make a simple application for face recognition.
And this is the PoC of that research.

![Example](https://raw.githubusercontent.com/patrykpacewicz/face-recognition-poc/master/doc/gif/pwmfXfAxSO.gif)

Libraries
---------
I'm using [tracking.js][tracking-js] library for face detection and [Microsoft Cognitive-Services Face API][ms-face-api] for face recognition. To use Face API you have to [register][ms-sign-up] and generate API key. It is not a problem because API is free for 30K calls per month :-).

How to run
----------
Start www frontend application
```
npm start
```

Start proxy server, which will communicate with the Face API server
```
API_KEY=XXX npm run start-server
```

Open [http://localhost:3000/][app] in your favorite web browser

[app]: http://localhost:3000/
[tracking-js]: https://trackingjs.com/
[ms-face-api]: https://www.microsoft.com/cognitive-services/en-us/face-api/documentation/overview
[ms-sign-up]: https://www.microsoft.com/cognitive-services/en-us/sign-up
