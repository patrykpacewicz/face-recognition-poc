face-recognition-poc
====================
I was asked to check how difficult it will be to make a simple 
application for face recognition. And this is the PoC of that research.

![Example](https://raw.githubusercontent.com/patrykpacewicz/face-recognition-poc/master/doc/gif/pwmfXfAxSO.gif)

Libraries
---------
I'm using [tracking.js][tracking-js] library for face detection 
and [Microsoft Cognitive-Services Face API][ms-face-api] for face recognition. 
To use Face API you have to [register][ms-sign-up] and generate API key. 
It is not a problem because API is free for 30K calls per month :-).

How to run
----------
Start www frontend application
```bash
# Create configuration with ms-face-api key

cat <<EOF > application-prod.yaml
projectOxford:
  subscriptionKey: "XXXXXXX"
EOF

# And run application
SPRING_PROFILES_ACTIVE="prod" ./gradlew run

```

Open [http://localhost:8080/][app] in your favorite web browser

How to run in dev/local mode
----------------------
Start www frontend application with local configuration
```bash
SPRING_PROFILES_ACTIVE="local" ./gradlew run
```

Start watch js files and update them after changes for development
```bash
# run watch using gradle
./gradlew npm_run_watch

# or you can run watch using npm
npm run watch
```


[app]: http://localhost:8080/
[tracking-js]: https://trackingjs.com/
[ms-face-api]: https://www.microsoft.com/cognitive-services/en-us/face-api/documentation/overview
[ms-sign-up]: https://www.microsoft.com/cognitive-services/en-us/sign-up

TODO
 - update README
 - obsługa błędów
 - lokalne testowanie bez ms-api
 - dodac testy jednostkowe
 
DONE
 - obsługa wersjonowania assetów 
 - add application.yaml as configuration
 - move to gradle
 - move api-client to scala
 - spring-boot as proxy
 - move to yarn
 - working watch

 - Only working on SSL:
   -- https://www.drissamri.be/blog/java/enable-https-in-spring-boot/
