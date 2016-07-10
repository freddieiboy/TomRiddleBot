import moment from 'moment';
import { FirebaseDb } from '../modules';
const ref = FirebaseDb.ref();

let allBotPrompts = ['Write in your diary right now.'];
let allBotTimes = ['12:00PM'];
// let promptSchedule = {};

export const setupPromptSchedule = () => {
  const promptSchedule = {
    time: allBotTimes[0],
    prompt: allBotPrompts[0]
  }

  return promptSchedule
};

const setupCurrentServerTime = () => {
  return moment().utc().format('hh:mmA');
};

const isItTimeToSendPrompt = (times, prompts) => {
  if (time === currentTime) {
    ref.child('users').orderByChild('isActive').equalTo(true).on('child_added', (id) => {
      sendTextMessage(id, prompts)
    })
  }
};
