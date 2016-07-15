import moment from 'moment';
import { FirebaseDb } from '../modules';
const ref = FirebaseDb.ref();
import { sendTextMessage } from './sendMessages';

let allBotPrompts = ['Writing is helpful, what did you do today?.'];
let allBotTimes = ['07:00PM'];
const temporaryID = 131722383924259;


// setup !!!
function runTimeInterval() {
  setInterval(() => {
    isItTimeToSendPrompt(setPromptSchedule(), currentServerTime());
  }, 60000)
};

runTimeInterval();

// ---

export const currentServerTime = (userZone) => {
  return moment().utc(userZone).format('hh:mmA');
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
  console.log(currentTime);
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
