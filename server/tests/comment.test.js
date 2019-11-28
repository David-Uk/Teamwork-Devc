import { it, describe, before } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';
import app from '../../index';

const url = '/api/v1/';
chai.use(chaiHttp);
const employee = {};
const article = {};
const gif = {};

describe('#Should handle employee comments', () => {
  before('Create a new employee', (done) => {
    chai
      .request(app)
      .post(`${url}/auth/create-user`)
      .send({
        email: 'viktorArticleComment@gmail.com',
        password: 'viktor',
        jobrole: 'admin',
      })
      .then((res) => {
        const { data } = res.body;
        employee.token = data.token;
      })
      .catch((error) => done(error))
      .then(() => {
        chai
          .request(app)
          .post(`${url}/articles`)
          .auth(employee.token, {
            type: 'bearer',
          })
          .send({
            title: 'another article',
            article: 'a fresh article',
          })
          .then((response) => {
            const { data } = response.body;
            article.id = data.articleid;
          })
          .catch((error) => done(error));
      })
      .then(() => {
        chai
          .request(app)
          .post(`${url}/gifs`)
          .auth(employee.token, {
            type: 'bearer',
          })
          .field('title', 'gif to comment on')
          .attach(
            'image',
            fs.readFileSync(path.resolve(__dirname, './image/img1.gif')),
            'giphy.gif',
          )
          .then((response) => {
            const { data } = response.body;
            gif.id = data.gifid;
            done();
          })
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  });

  it('Should enable employees to comment on a post', (done) => {
    chai
      .request(app)
      .post(`${url}/articles/${article.id}/comment`)
      .auth(employee.token, {
        type: 'bearer',
      })
      .send({
        comment: 'My first comment',
      })
      .then((response) => {
        chai.expect(response.body).to.have.property('data');
        const { data } = response.body;
        chai.expect(data).to.have.property('article');
        chai.expect(data).to.have.property('articleTitle');
        chai.expect(data.message).to.equal('Comment successfully created');
        done();
      })
      .catch((error) => done(error));
  });

  it('Should enable users to comment on gif', (done) => {
    chai
      .request(app)
      .post(`${url}/gifs/${gif.id}/comment`)
      .auth(employee.token, {
        type: 'bearer',
      })
      .send({
        comment: 'Comment on gif',
      })
      .then((response) => {
        chai.expect(response.body).to.have.property('data');
        const { data } = response.body;
        chai.expect(data).to.have.property('gifTitle');
        chai.expect(data.message).to.equal('comment successfully created');
        done();
      })
      .catch((error) => done(error));
  });
});
