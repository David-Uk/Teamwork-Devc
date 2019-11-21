import { it, describe, before } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';
import app from '../../index';

const url = '/api/v1/';
chai.use(chaiHttp);
const employee = {};
const gif = {};

describe('#Handle gif posts', () => {
  before('Create a new employee', (done) => {
    chai
      .request(app)
      .post(`${url}/auth/create-user`)
      .send({
        email: 'bishop@yahoo.com',
        password: 'bishop',
        jobrole: 'accountant',
      })
      .then((res) => {
        const { data } = res.body;
        employee.token = data.token;
        done();
      })
      .catch((error) => done(error));
  });

  it('Should post a gif file', (done) => {
    chai
      .request(app)
      .post(`${url}/gifs`)
      .auth(employee.token, {
        type: 'bearer',
      })
      .field('title', 'new gif post')
      .attach(
        'image',
        fs.readFileSync(path.resolve(__dirname, './image/img1.gif')),
        'img1.gif',
      )
      .then((response) => {
        chai.expect(response.body).to.have.property('status');
        chai.expect(response.body).to.have.property('data');
        const { data } = response.body;
        chai.expect(data).to.have.property('imageurl');
        chai.expect(data).to.have.property('gifid');
        chai.expect(data.message).to.equal('GIF image successfully posted');
        gif.id = data.gifid;
        done();
      })
      .catch((error) => done(error));
  });

  it('Should retrieve a posted gif file', (done) => {
    chai
      .request(app)
      .get(`${url}/gifs/${gif.id}`)
      .auth(employee.token, {
        type: 'bearer',
      })
      .then((response) => {
        const { data } = response.body;
        chai.expect(data).to.have.property('comments');
        chai.expect(data.comments).to.be.an('array');
        done();
      })
      .catch((error) => done(error));
  });

  it('Should delete a posted gif file', (done) => {
    chai
      .request(app)
      .delete(`${url}/gifs/${gif.id}`)
      .auth(employee.token, {
        type: 'bearer',
      })
      .then((response) => {
        const { data } = response.body;
        chai.expect(data.message).to.equal('gif post successfully deleted');
        done();
      })
      .catch((error) => done(error));
  });
});
