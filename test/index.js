import http from 'http';
import assert from 'assert';

import '../src/server.js';

describe('Node Server', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:5000', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  //TODO: receive msg 200
  //TODO: send msg 200
  //TODO: send at scheduled times
});
