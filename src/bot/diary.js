import { sendTextMessage } from './send';
import moment from 'moment';
import request from 'request';

export const receiveDiary = (id, text) => {
  if (text.indexOf("love") > 0) {
    // TODO: answer back
    sendDiary(id, "Did you say love?");
  } else {
    sendDiary(id, "You didn't say love");
  }
  //NOTE: the logic will need to know what to
  // do once we receive data from the user.
  // For instance, what if they say something
  // interesting, how do we tell them to elaborate.
}

// NOTE: bot only send a msg when a user prompts and at the appointed times

// SHCEDULE TIME SECTION
const frozenTime = moment().format();
console.log(frozenTime);

const defaultScheduleDiaryTimes = [
  //TODO: list of diary sending times
]

const userGeneratedDiaryTimes = [
  //TODO: hydrate this with logic
]

const pickupLines = () => {
  //TODO: logic to choose from different lines
}

export const sendDiary = (id, text) => {
  if (defaultScheduleDiaryTimes && !userGeneratedDiaryTimes) {
    //TODO: send logic based on default diary times
    sendTextMessage(id, text)
  } else {
    //TODO: send logic based on custom diary times
    sendTextMessage(id, text)
  }
}
