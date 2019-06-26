const ThingSpeakClient = require('thingspeakclient');
const client = new ThingSpeakClient();
const five = require('johnny-five');
const env = require('dotenv');

const Arduino = new five.Board();

const CANAL = env.CANAL;
const WRITE_KEY = env.WKEY;

client.attachChannel(CANAL, { writeKey: WRITE_KEY}, () => {
   console.log('Conectou com o ThingSpeak');
});

const sendThingSpeak = (data) => {
   client.updateChannel(CANAL, data);
}


Arduino.on('ready', () => {
   console.log("Arduino Pronto");

   setTimeout(() => {
       const pin7 = new five.Pin(7);
       const pin6 = new five.Pin(6);
       const pin5 = new five.Pin(5);
  
       pin7.read((err, value) => {
           console.log(`Pino 7 ${value}`);
       });
       pin6.read((err, value) => {
           console.log(`Pino 6 ${value}`);
       });
       pin5.read((err, value) => {
           console.log(`Pino 5 ${value}`);
       });
   }, 3000);
   // sendThingSpeak({ field1: 3 });
});

