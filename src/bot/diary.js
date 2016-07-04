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

const defaultTimes = ['02:12PM', '09:00AM', '7:00PM', '11:00PM'];
const userTimes = [];
const botLines = [
  'Hey, how are you doing today?',
  'Do you want to write an entry? Tell me about it.',
  'So how is it going today?',
  'Anything interesting to tell me?',
  'Writing is helpful, what are you thinking?'
];
const userIdList = [1128889967149164];

// SCHEDULED TIMES
// This gets checks defaultTimes against current time. If true,
// sends a random botLine to everyone on userIdList.
export const setupDefaultScheduleMsg = (defaultTimes, userIdList, botLines) => {
  const randomNumber = Math.floor(Math.random() * botLines.length);
  defaultTimes.map(time => {
    if (time === moment().format('hh:mmA')) {
      //TODO: iterate over every ID TMB has w/ user consent
      console.log('sending defaultMsg at:', time)
      if (!process.env.NODE_ENV === 'test') {
        sendTextMessage(userIdList[0], botLines[randomNumber]);
      } else {
        return console.log('test mode!');
      }
    }
  });
}

// const sendDefault = setupDefaultScheduleMsg(defaultTimes, userIdList, botLines);

// Run setupDefaultScheduleMsg every 60 seconds.
console.log(process.env.NODE_ENV === 'test')

if (!process.env.NODE_ENV === 'test') {
  setInterval(() => {
    console.log('setInterval is running')
    setupDefaultScheduleMsg(defaultTimes, userIdList, botLines);
  }, 60000);
}

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
