import { callSendAPI } from './sendMessages';

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
      if (counting === 10) {
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
  if (counting === 0) {
    stopWatch.start(() => sendReply(id, "Thanks, I'll check back tomorrow."));
    // stopWatch.start(() => console.log("Thanks for the reply, I'll ask again tomorrow."));
  } else {
    stopWatch.reset();
  }
}

export const sendReply = (id, text) => {
  const messageData = {
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

// incomingMessage(1, 'test');
