import moment from 'moment';
import { FirebaseDb } from '../modules';
const ref = FirebaseDb.ref();

let allBotPrompts = ['Write in your diary right now.'];
let allBotTimes = ['12:00PM'];
const temporaryID = 131722383924259;

// sendTextMessage(temporaryID, 'Test sendTextMessage');

export const setPromptSchedule = () => {
  const newSchedule = {
    time: allBotTimes[0],
    prompt: allBotPrompts[0]
  }

  return newSchedule;
};

export const setScheduleHistory = (time, prompt) => {
  const oldSchedule = {
    time: time,
    prompt: prompt
  }

  return oldSchedule;
}

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
