# Tom Riddle bot
A daily conversational diary bot

### Start bot dev
  ###### Serve it on node locally
    npm run serve
  ###### Run mocha tests
    npm run test
  ###### For production, build and start it
    npm run build && node dist/server.js

### Push bot prod
  ###### Push bot to Github and Heroku builds from master after green CI tests
    git push

### Run locally to test bot
  ###### lt --port 5000 --subdomain tomriddlebot
    npm run lt
