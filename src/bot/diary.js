import { sendTextMessage } from './send';
import moment from 'moment';
import request from 'request';

export const receiveDiary = (id, text) => {
  // console.log("receiveDiary function run", id);
  // if (text.indexOf("dad") >= 0) {
  //   // TODO: answer back
  //   if (text.indexOf("hate") >= 0) {
  //     sendDiary(id, "Who else in your family hates you?");
  //   }
  //   sendDiary(id, "Do you miss your dad?");
  // } else {
  //   sendDiary(id, "I don't understand.");
  // }
  console.log(text);
  // console.log(getUserInfo(id, text));
  //NOTE: the logic will need to know what to
  // do once we receive data from the user.
  // For instance, what if they say something
  // interesting, how do we tell them to elaborate.
}

// NOTE: bot only send a msg when a user prompts and at the appointed times

const defaultScheduleDiaryTimes = [
  '02:56PM',
  '02:57PM',
  '02:58AM',
]

const userGeneratedDiaryTimes = [
  1130
]

const pickupLine = () => {
  //TODO: logic to choose from different lines
  const lines = [
    'How was your day?',
    'What did you do today?',
    'Hey, how was it today?',
    'Tell me, Wha did you today?'
  ]
  const randomNumber = Math.floor(Math.random() * lines.length)
  return lines[randomNumber]
}

// export const sendDiary = (id, text) => {
// const sendDiary = () => {
  // const hour = new Date().getHours();
  // const minute = new Date().getMinutes();
  // const currentTime = hour + ':' + minute
  //
  // if (currentTime === defaultScheduleDiaryTimes) {
  //   //TODO: send logic based on default diary times
  //   sendTextMessage(1128889967149164, pickupLine())
  // } else {
  //   console.log(currentTime, defaultScheduleDiaryTimes, 'not this time')
  // }
// }

// function getUserInfo(id, messageData) {
//   request({
//     uri: 'https://graph.facebook.com/v2.6/',
//     qs: {
//       USER_ID: id,
//      access_token: PAGE_ACCESS_TOKEN
//     },
//     method: 'GET'
//
//   }, (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//       var recipientId = body.recipient_id;
//       console.log("Successfully got recipient info.", recipientId);
//       return body;
//     } else {
//       console.error("Unable to get info.");
//       console.error(response);
//       console.error(error);
//     }
//   });
// }

// const intTime = () => {
//   defaultScheduleDiaryTimes.map((time) => {
//     console.log(time === moment().format('hh:mmA'), time, moment().format('hh:mmA'))
//   })
// }

// setInterval(intTime, 60000)
  // else {
  //   //TODO: send logic based on custom diary times
  //   console.log("nope not time");
  //   // sendTextMessage(id, text)
  // }
// }

// sendDiary();
