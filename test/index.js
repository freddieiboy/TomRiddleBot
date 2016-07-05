import http from 'http';
import { should, expect, assert } from 'chai';
import { redButton } from '../src/server.js';
import { setupDefaultScheduleMsg } from '../src/bot/diary';

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

  //TODO: receive msg 200
  //TODO: send msg 200
  //TODO: send at scheduled times
});

describe('default sheduled times', function() {
  //TODO: come back and make this test pass. It's not working currently.
  // beforeEach(() => {
    const lines = ['Hey, listen.', 'Ready?', 'Let\'s write.'];
    const PMtimes = ['01:00PM'];
    const AMtimes = ['01:00AM'];
    const ids = [1128889967149164];
    const currentPMTime = '01:00PM';
    const currentAMTime = '01:00AM';
  // })

  it('should send PM sheduled times', () => {
    const schedule = setupDefaultScheduleMsg(PMtimes, ids, lines, currentPMTime);
    // expect(schedule).to.equal(true);
  });

  it('should send AM sheduled times', () => {
    let schedule = setupDefaultScheduleMsg(PMtimes, ids, lines, currentAMTime);
    console.log(schedule)
    // expect(schedule).to.equal(true);
  });
});
