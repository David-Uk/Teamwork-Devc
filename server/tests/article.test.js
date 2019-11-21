import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const url = '/api/v1/';
chai.use(chaiHttp);
const employee = {};
const article = {};

describe('#Should handle articles', () => {
  before('Create a new employee', (done) => {
    chai
      .request(app)
      .post(`${url}/auth/create-user`)
      .send({
        email: 'viktorArticle@gmail.com',
        password: 'viktor',
        jobrole: 'Programmer',
      })
      .then((res) => {
        const { data } = res.body;
        employee.token = data.token;
        done();
      })
      .catch((error) => done(error));
  });

  it('Should create a new article', (done) => {
    chai
      .request(app)
      .post(`${url}/articles`)
      .auth(employee.token, {
        type: 'bearer',
      })
      .send({
        title: 'My first title',
        article: 'My first article',
      })
      .then((response) => {
        chai.expect(response.body).to.have.property('data');
        const { data } = response.body;
        chai.expect(data).to.have.property('title');
        chai.expect(data).to.have.property('articleid');
        chai.expect(data.message).to.equal('Article successfully posted');
        article.id = data.articleid;
        done();
      })
      .catch((error) => done(error));
  });

  it('Should edit enable users edit their articles', (done) => {
    chai
      .request(app)
      .patch(`${url}/articles/${article.id}`)
      .auth(employee.token, {
        type: 'bearer',
      })
      .send({
        title: 'I have edited this title',
        article: 'I have edited this article',
      })
      .then((response) => {
        chai.expect(response.body).to.have.property('data');
        const { data } = response.body;
        chai.expect(data).to.have.property('title');
        chai.expect(data).to.have.property('article');
        chai.expect(data.message).to.equal('Article successfully updated');
        done();
      })
      .catch((error) => done(error));
  });

  it('Should display all articles', (done) => {
    chai
      .request(app)
      .get(`${url}/feed`)
      .auth(employee.token, {
        type: 'bearer',
      })
      .then((response) => {
        const { data } = response.body;
        chai.expect(data).to.be.an('array');
        done();
      })
      .catch((error) => done(error));
  });

  it('Should display a selected article', (done) => {
    chai
      .request(app)
      .get(`${url}/articles/${article.id}`)
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

  it('Should enable users delete their article', (done) => {
    chai
      .request(app)
      .delete(`${url}/articles/${article.id}`)
      .auth(employee.token, {
        type: 'bearer',
      })
      .then((response) => {
        const { data } = response.body;
        chai.expect(data.message).to.equal('Article successfully deleted');
        done();
      })
      .catch((error) => done(error));
  });
});
