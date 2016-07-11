import { sendTextMessage } from './diary';

let currentMsgQueue = [];
let oldMsgQueue = [];

let counting = 0;

class timer {
  reset() {
    counting = 0;
    clearInterval(timer);
  }
  start(callback) {
    const timer = setInterval(() => {
      counting += 1
      console.log(counting);
      if (counting === 7) {
        clearInterval(timer)
        console.log('Saving this message!')
        callback();
      }
    }, 1000)
  }
}

const stopWatch = new timer;

export const incomingMessage = (id, text) => {
  currentMsgQueue = [...currentMsgQueue, text]
  console.log(currentMsgQueue)
  if (counting === 0) {
    stopWatch.start(() => sendReply(id, 'done'));
  }
  stopWatch.reset();
}

const sendReply = (id, text) => {
  console.log(id, text)
}

incomingMessage(1, 'Hey');
setTimeout(() => incomingMessage(1, 'Hey'), 1000)
setTimeout(() => incomingMessage(1, 'Hey'), 4000)
