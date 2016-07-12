import http from 'http';
import { should, expect, assert } from 'chai';
import { redButton } from '../src/server.js';
import * as schedulePrompt from '../src/bot/schedulePrompt';
import * as textReponse from '../src/bot/textReponse';
import moment from 'moment';

//TODO: make sure that bot starts up
describe('Node Server', () => {
  after(done => {
      redButton.close();
      done();
  });
  it('should return 200', done => {
    http.get('http://127.0.0.1:5000', res => {
      // assert.equal(200, res.statusCode);
      expect(res.statusCode, 'Success code').to.equal(200);
      done();
    });
  });
  it('should have correct server timezone of UTC', () => {
    const time = schedulePrompt.setCurrentServerTime;
    expect(moment().utcOffset(time())._offset).to.equal(-0)
  });
  it('should successfully send msgs', () => {
    //TODO
  });
  it('should successfully receive msgs', () => {
    //TODO
  });
});

//TODO: refractor schedule for one time a day. Make tests pass.
describe('bot schedule prompt', () => {
  const schedule = schedulePrompt.setPromptSchedule();
  const oldSchedule = schedulePrompt.setScheduleHistory('07:00PM', 'Test Prompt');

  it('should queue 1 prompt that day in setupPromptSchedule', () => {
    expect(schedule.time).to.not.be.null;
    expect(schedule.prompt).to.not.be.null;
  });
  it('should not have the same prompt as the previous day', () => {
    expect(oldSchedule.time).to.not.equal(schedule.time);
    expect(oldSchedule.prompt).to.not.equal(schedule.prompt);
  });
  it('should send at scheduled time', () => {
    const sendPrompt = schedulePrompt.isItTimeToSendPrompt;
    const scheduledTime1 = {time:'11:00PM'};
    const scheduledTime2 = {time:'12:00PM'};
    const currentTime = '11:00PM';

    expect(sendPrompt(scheduledTime1, currentTime)).to.equal.true;
    expect(sendPrompt(scheduledTime2, currentTime)).to.not.equal.true;
  });
  // it('should allow users to change sheduled time', () => {
  //   //TODO
  // });
  // it('should return to default time on command', () => {
  //   //TODO
  // });
});

//TODO: refactor bot lines for longer answers. Make tests pass.
describe('bot text response', () => {
  it('should wait a few seconds between each text before sending out a thank you response', () => {
    const counting = textReponse.counting;
    const stopWatch = textReponse.stopWatch;
    const incomingMessage = (id, txt) => textReponse.incomingMessage(id, txt);

    //TODO come back and make this pass

    expect(counting).to.equal(0);
  });
  it('should send a thank you response', () => {
    //TODO doesn't check send, only that object is present for sending
    const sendReply = textReponse.sendReply(1, 'hey');

    expect(sendReply).to.have.deep.property('message.text', 'hey')
  });
  context('response logic', () => {
    it('should respond to 5 keywords and immediately ask questions.', () => {
      
    });
  })
});

//TODO: save journal entry for users when they sign in.
// describe('saving journal entries', () => {
//   it('should save a journal entry when a user sends an entry', () => {
//
//   });
//   it('should batch journal entries by date.', () => {
//
//   });
//   it('should save users ID, createdTime, and createdDate', () => {
//
//   })
// });

//TODO: add redux for state management.
// describe('state tree', () => {
//   it('should hydrate some content on redux every few hours', () => {
//
//   })
// });
