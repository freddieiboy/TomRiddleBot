import { callSendAPI } from './send';
import moment from 'moment';

// RECEIVE TEXT MESSAGE
export const receiveTextMsg = (id, text) => {
  // if (text.indexOf("love") >= 0) {
  //   // TODO: answer back
  //   console.log('love');
  //   sendDiary(id, "Did you say love?");
  // } else {
    sendTextMessage(id, text);
  // }
}

// SCHEDULED TIMES
const setupDefaultSchedule = () => {
  const defaultScheduleDiaryTimes = ['09:00AM', '7:00PM', '11:00PM']
  const userGeneratedDiaryTimes = []
  const pickupLines = [
    'Hey, how are you doing today?',
    'Do you want to write an entry? Tell me about it.',
    'So how is it going today?',
    'Anything interesting to tell me?',
    'Writing is helpful, what are you thinking?'
  ]
  const randomNumber = Math.floor(Math.random() * pickupLines.length);

  defaultScheduleDiaryTimes.map(defaultTime => {
    if (defaultTime === moment().format('hh:mmA')) {
      //TODO: iterate over every ID TMB has w/ user consent
      console.log('sending defaultMsg at:', defaultTime)
      sendTextMessage(1128889967149164, pickupLines[randomNumber]);
    }
  })
}

setInterval(setupDefaultSchedule, 60000)

//TODO: sendScheduledMsg
//TODO: sendReponseMsg

// SEND TEXT MESSAGE
export const sendTextMessage = (recipientId, messageText) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}
