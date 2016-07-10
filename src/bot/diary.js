import { callSendAPI } from './send';
import moment from 'moment';
import request from 'request';
import { PAGE_ACCESS_TOKEN, addNewUser } from './receive';
import { FirebaseDb } from '../modules';
export const ref = FirebaseDb.ref();

import * as schedule from './schedulePrompt';

//TODO: refractor schedule for one time a day. Make tests pass.
//TODO: refactor bot lines for longer answers. Make tests pass.
//TODO: save journal entry for users when they sign in.
//TODO: add redux for state management.
//TODO: allow users to change when tom messages them.

// RECEIVE TEXT MESSAGE
export const receiveTextMsg = (id, text) => {
  setTimeout(() => {
    sendTextMessage(id, 'Thanks, saving it your diary.');
  }, 3000)
}

export const welcomeBackMessage = (recipientId, name) => {
  const messageText = 'Welcome back, ' + name + '.'

  sendTextMessage(recipientId, messageText);
}

export const firstWelcomeMessage = (recipientId, name) => {
  console.log('this is from welcome message', recipientId);
  const messageText = 'Welcome to your conversational diary, ' + name + '. My name is Tom Riddle.'

  sendTextMessage(recipientId, messageText);
}

const defaultTimes = ['11:15PM', '11:25PM', '11:35PM'];
const userTimes = [];
const botLines = [
  'Hey, how are you doing today?',
  'Do you want to write an entry? Tell me about it.',
  'So how is it going today?',
  'Anything interesting to tell me?',
  'Writing is helpful, what are you thinking?',
  'Think about your day. What stood out?',
  'Write an entry right now.',
  'How are you feeling?'
];

let userIdList = [];
let userTimezone = 0;

// TEMPORARY!!! set up userIdList from isActive users on Firebase.
const stateSetupUserList = () => {
  ref.child('users').orderByChild('isActive').equalTo(true).on('child_added', (snapshot) => {
    const id = snapshot.val().id;
    userIdList.push(id);
  });
}
stateSetupUserList();

const getCurrentTime = (userTimezone) => {
  return moment().utc().utcOffset(userTimezone).format('hh:mmA');
}

// console.log(getCurrentTime(userTimezone));

// SCHEDULED TIMES
// This gets checks defaultTimes against current time. If true,
// sends a random botLine to everyone on userIdList.
export const setupDefaultScheduleMsg = (defaultTimes, userIdList, botLines, currentTime) => {
  const randomNumber = Math.floor(Math.random() * botLines.length);
  defaultTimes.map(time => {
    // console.log(currentTime)
    if (time === currentTime) {
      // console.log(time, currentTime, time === currentTime)
      //TODO: iterate over every ID TMB has w/ user consent
      if (process.env.NODE_ENV !== 'test') {
        console.log('sending defaultMsg at:', time)
        userIdList.map(id => {
          console.log(id);
          sendTextMessage(id, botLines[randomNumber])
        })
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
    setupDefaultScheduleMsg(defaultTimes, userIdList, botLines, getCurrentTime(0));
  }, 60000);
}

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
