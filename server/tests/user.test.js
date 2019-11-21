import { it, describe } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import user from '../mock/mockuser';

chai.use(chaiHttp);
const url = '/api/v1/auth';

describe('Should ensure that user endpoints meet specs', () => {
  describe('Should handle sign up', () => {
    it('should reject empty fields', () => {
      const userData = {};
      chai
        .request(app)
        .post(`${url}/create-user`)
        .send(userData)
        .end((request, response) => {
          response.body.should.have.property('status')
            .equal(422);
        });
      done();
    });

    it('should create new user', (done) => {
      chai
        .request(app)
        .post(`${url}/create-user`)
        .send({
          email: 'increase22@gmail.com',
          password: 'increase',
          jobrole: 'admin',
        })
        .then((response) => {
          chai.expect(response.body).to.have.property('status').equal(201);
          chai.expect(response.body).to.have.property('data');
          const { data } = response.body;
          chai.expect(data).to.have.property('token');
          chai.expect(data).to.have.property('userId');
          chai.expect(data.message).to.equal('user account successfully created');
        });
      done();
    });

    it('should reject already registered user', (done) => {
      const userData = { ...user[1] };
      chai.request(app)
        .post(`${url}/create-user`)
        .send(data)
        .end((request, response) => {
          response.body.should.have.property('status')
            .equal(409);
          response.body.should.have.property('message')
            .equal('Email already exists !');
        });
      done();
    });
  });

  describe('#Should handle sign in of registered user', () => {
    it('should reject empty fields', (done) => {
      const userData = {};
      chai.request(app)
        .post('/api/v1/auth/signin/')
        .send(userData)
        .end((request, response) => {
          response.body.should.have.property('status')
            .equal(422);
          response.body.message.should.be.an('Array');
        });
      done();
    });

    it('should reject invalid details', (done) => {
      const data = {
        email: user[1].email,
        password: user[1].password,
      };
      chai.request(app)
        .post(`${url}/signin`)
        .send(data)
        .end((request, response) => {
          response.body.should.have.property('status')
            .equal(400);
          response.body.should.have.property('message')
            .equal('Invalid credentials');
        });
      done();
    });

    it('should successfully login if fields match specified criteria', (done) => {
      const data = {
        email: user[1].email,
        password: user[1].textPassword,
      };
      chai.request(app)
        .post(`${url}/signin`)
        .send(data)
        .end((request, response) => {
          response.body.should.have.property('status')
            .equal(200);
          response.body.should.have.property('message')
            .equal('User is successfully logged in');
          response.body.data.should.be.an('Object');
          response.body.data.should.have.property('token');
          response.body.data.should.have.property('userId');
        });
      done();
    });
  });
});
