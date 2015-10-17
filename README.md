# lifx-js boilerplate
very simple node.js server with sockets to play around with lifx bulbs. Makes use of the excellent [node-lifx](https://github.com/MariusRumpf/node-lifx) from @MariusRumpf, to help you hack around with your LIFX bulbs in the browser.

## Setup:
```
    npm install && npm start
```
Will install all the dependancies and run light.js

## Usage
Edit `client-js/main.js` to get started. 

light.js uses webpack to magically include all the dependencies that you require and puts `main.js` into the `static` folder.
