import { callSendAPI } from './send';
import moment from 'moment';
import request from 'request';
import { PAGE_ACCESS_TOKEN, addNewUser } from './receive';


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

const initNewAccount = () => {
  //TODO if new account, send welcome message
}

export const welcomeMessage =(id) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: ''
      //TODO add personalized welcome message
    }
  };

  sendTextMessage(recipientId, messageText);
}

export const getUserInfo = (id) => {
  request({
    uri: 'https://graph.facebook.com/v2.6/',
    qs: {
      id,
      fields: "first_name,last_name,profile_pic,locale,timezone,gender",
      access_token: PAGE_ACCESS_TOKEN
    },
    method: 'GET',

  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      // var recipientId = body.recipient_id;
      // var messageId = body.message_id;

      console.log(response.statusCode, "Successfully got User FB Info");
      addNewUser(id, body);
    } else {
      // console.log(response)
      console.error(response.statusCode, "Unable to send message.");
    }
  });
}

const defaultTimes = ['02:12PM', '06:22PM', '07:34PM', '11:00PM'];
const userTimes = [];
const botLines = [
  'Hey, how are you doing today?',
  'Do you want to write an entry? Tell me about it.',
  'So how is it going today?',
  'Anything interesting to tell me?',
  'Writing is helpful, what are you thinking?'
];
const userIdList = [1128889967149164];

const getCurrentTime = () => {
  return moment().format('hh:mmA');
}

// SCHEDULED TIMES
// This gets checks defaultTimes against current time. If true,
// sends a random botLine to everyone on userIdList.
export const setupDefaultScheduleMsg = (defaultTimes, userIdList, botLines, currentTime) => {
  const randomNumber = Math.floor(Math.random() * botLines.length);
  defaultTimes.map(time => {
    if (time === currentTime) {
      // console.log(time, currentTime, time === currentTime)
      //TODO: iterate over every ID TMB has w/ user consent
      if (process.env.NODE_ENV !== 'test') {
        console.log('sending defaultMsg at:', time)
        sendTextMessage(userIdList[0], botLines[randomNumber]);
      } else {
        console.log('true!!!')
        return true;
      }
    }
  });
}

// Run setupDefaultScheduleMsg every 60 seconds.
if (process.env.NODE_ENV !== 'test') {
  setInterval(() => {
    setupDefaultScheduleMsg(defaultTimes, userIdList, botLines, getCurrentTime());
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
