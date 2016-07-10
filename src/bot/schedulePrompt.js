import moment from 'moment';
import { FirebaseDb } from '../modules';
const ref = FirebaseDb.ref();
import { sendTextMessage } from './diary';

let allBotPrompts = ['Write in your diary right now.'];
let allBotTimes = ['12:00PM'];
const temporaryID = 131722383924259;

export const setCurrentServerTime = () => {
  return moment().utc().format('hh:mmA');
};

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

export const isItTimeToSendPrompt = (scheduledPrompt, currentTime) => {
  if (scheduledPrompt.time === currentTime) {
    if (process.env.NODE_ENV === 'test') {
      return true;
    } else {
      ref.child('users').orderByChild('isActive').equalTo(true).on('child_added', (id) => {
        sendTextMessage(id, prompts)
      })
    }
  }
};
