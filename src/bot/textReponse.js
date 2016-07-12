import { callSendAPI } from './send';

// Create stopwatch !!!

export let counting = 0;

export class timer {
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
        callback();
      }
    }, 1000)
  }
}

export const stopWatch = new timer;

// ---

let currentMsgQueue = [];
let oldMsgQueue = [];

export const incomingMessage = (id, text) => {
  currentMsgQueue = [...currentMsgQueue, text]
  console.log(currentMsgQueue)
  if (counting === 0) {
    // stopWatch.start(() => sendReply(id, 'Saved to your diary.'));
    stopWatch.start(() => console.log("Thanks for the reply, I'll ask again tomorrow."));
  } else {
    stopWatch.reset();
  }
}


incomingMessage(1, 'Hey');
setTimeout(() => incomingMessage(1, 'Another hey!'), 2000);
setTimeout(() => incomingMessage(1, 'Final hey!'), 4000);

export const sendReply = (id, text) => {
  var messageData = {
    recipient: {
      id: id
    },
    message: {
      text: text
    }
  };

  callSendAPI(messageData);
  return messageData
}
