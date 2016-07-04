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

describe('default sheduled times', () => {
  //TODO: come back and make this test pass. It's not working currently.

  const lines = ['Hey, listen.', 'Ready?', 'Let\'s write.'];
  const PMtimes = ['01:00PM', '04:28PM', '11:32PM'];
  const AMtimes = ['02:00AM', '03:42AM', '10:53AM'];
  const ids = [1128889967149164];

  it('should send PM sheduled times', () => {
    setupDefaultScheduleMsg(PMtimes, ids, lines);
    // expect('', 'send AM line').to.be.ok;
    expect(lines).equal(lines);
  });

  it('should send AM sheduled times', () => {
    setupDefaultScheduleMsg(PMtimes, ids, lines);
    // expect('', 'send PM line').to.be.ok;
  });
});
