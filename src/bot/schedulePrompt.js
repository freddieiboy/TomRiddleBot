import moment from 'moment';
import { FirebaseDb } from '../modules';
const ref = FirebaseDb.ref();
import { sendTextMessage } from './sendMessages';
import { store } from '../store/users';

let allBotPrompts = ['Writing is helpful, what did you do today?.'];
let allBotTimes = ['07:00PM'];
const temporaryID = 131722383924259;

store.subscribe(() =>
  console.log(store.getState())
)

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1


// setup !!!
export const runTimeInterval = (intervalTime) => {
  if (process.env.NODE_ENV) return true;
  setInterval(() => {
    isItTimeToSendPrompt(setPromptSchedule(), currentServerTime());
  }, intervalTime)
};

runTimeInterval(60000);

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
