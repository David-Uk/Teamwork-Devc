/* eslint-disable no-undef */
import { describe } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.should();
chai.use(chaiHttp);

describe('#Endpoint prefix', () => {
  it('should reject access to unspecified endpoints', (done) => {
    chai.request(app)
      .get('/api/v1/')
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(400);
      });
    done();
  });
});
