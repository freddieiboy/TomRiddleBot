import { sendTextMessage } from './send';

export const receiveDiary = (id, text) => {
  console.log("receiveDiary function run", id);
  if (text.indexOf("dad") >= 0) {
    // TODO: answer back
    if (text.indexOf("hate") >= 0) {
      sendDiary(id, "Who else in your family hates you?");
    }
    sendDiary(id, "Do you miss your dad?");
  } else {
    sendDiary(id, "I don't understand.");
  }
  //NOTE: the logic will need to know what to
  // do once we receive data from the user.
  // For instance, what if they say something
  // interesting, how do we tell them to elaborate.
}

// NOTE: bot only send a msg when a user prompts and at the appointed times

const defaultScheduleDiaryTimes = [
  844
]

const userGeneratedDiaryTimes = [
  //TODO: hydrate this with logic
]

const pickupLines = () => {
  //TODO: logic to choose from different lines
  let random = 0;
  const lines = [
    'How was your day?',
    'What did you do today?',
    'Hey, how was it today?',
    'Tell me, Wha did you today?'
  ]
  return lines[random]
}

export const sendDiary = (id, text) => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const today = hour + '' + minute
  console.log(today);
  //TODO: if time send
  if (today === defaultScheduleDiaryTimes[0] && today === !userGeneratedDiaryTimes[0]) {
    //TODO: send logic based on default diary times
    sendTextMessage(id, 'This sent at 10:10pm')
  } else {
    //TODO: send logic based on custom diary times
    console.log("sendDiary function run");
    // sendTextMessage(id, text)
  }
}

sendDiary();
