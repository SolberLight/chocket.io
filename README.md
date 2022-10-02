<p align="center">
    <a href="https://github.com/SolberLight/chocket.io" target="_blank" rel="noopener noreferrer">
        <img width="100" src="https://user-images.githubusercontent.com/61121160/193433585-579f9282-794e-49ca-b426-284743f969c7.png" alt="Chocket.io">
    </a>
</p>

<h1 align="center">
    Chocket.io
</h1>

---

## Introduction

Chocket.io is a Vue.js / Express.js / Socket.io based chat app. It has been created just to present
a working demo using those 3 technologies.


## Run locally

- Make sure to have MongoDB server installed and running.
- Install node.js 16.X
- Download repo and at the root of it run `npm i`
- Then go to the client folder and also run `npm i`

Now to run the server in localhost :
- In root directory run `npm run dev`
- And in client directory run `npm run serve`

IT'S READY ! Now go to [localhost:8081](http://localhost:8081) and see the result !

## Deploy the app on Heroku

- First create an [Heroku account](https://signup.heroku.com/).
- Then create an app, name it however you like.
- In settings add three env variables :
  - NODE_ENV=production
  - PORT=8080
  - DATA_URL=YOUR_DATABASE_URL_PUBLICLY_AVAILABLE
- Before deploying compile the front end by going into the client folder then run `npm run build`
- Once built, go back to root directory and commit your changes !
- Now go to 'deploy' tab -> Connect your github account -> select your repository and branch
- Then you can click deploy !

SUCCESS ! Your app is now deployed. You can click 'OPEN APP' to see it on the web !