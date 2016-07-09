import http from 'http';
import { should, expect, assert } from 'chai';
import { redButton } from '../src/server.js';
import { setupDefaultScheduleMsg } from '../src/bot/diary';

//TODO: make sure that bot starts up
describe('Node Server', () => {
  after(function (done) {
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
  it('should successfully send msgs', () => {
    //TODO
  });
  it('should successfully receive msgs', () => {
    //TODO
  });
});

//TODO: refractor schedule for one time a day. Make tests pass.
describe('bot schedule prompt', () => {
  it('should queue 1 prompt that day', () => {
    //TODO
  });
  it('should not have the same prompt as the previous two days', () => {
    //TODO
  });
  it('should send at scheduled time', () => {
    //TODO
  });
  it('should allow users to change sheduled time', () => {
    //TODO
  });
  it('should return to default time on command', () => {

  });
});

//TODO: refactor bot lines for longer answers. Make tests pass.
describe('bot text response', () => {
  it('should wait a few seconds between each text before sending out a thank you response', () => {
    //TODO
  });
  it('should send a thank you response', () => {
    //TODO
  });
});

//TODO: save journal entry for users when they sign in.
describe('saving journal entries', () => {
  it('should save a journal entry when a user sends an entry', () => {
    //TODO
  });
  it('should batch journal entries by date.', () => {
    //TODO
  });
  it('should save users ID, createdTime, and createdDate', () => {
    //TODO
  })
});

//TODO: add redux for state management.
describe('state tree', () => {
  it('should hydrate some content on redux every few hours', () => {
    //TODO
  })
});
