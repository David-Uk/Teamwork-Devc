import DB from '../db';

const dropEmpTable = 'DROP TABLE IF EXISTS employees CASCADE';
const employeTable = `CREATE TABLE IF NOT EXISTS employees(
userid serial NOT NULL,
email VARCHAR(40) NOT NULL,
password VARCHAR(40) NOT NULL,
address VARCHAR(50),
gender VARCHAR(1),
jobrole VARCHAR(20) NOT NULL,
firstname TEXT,
lastname TEXT,
department VARCHAR(20),
CONSTRAINT employee_pkey PRIMARY KEY(userid)
)`;

const dropArticleTable = 'DROP TABLE IF EXISTS articles CASCADE';
const articleTable = `CREATE TABLE IF NOT EXISTS articles(
articleid serial NOT NULL,
authorid serial,
title VARCHAR(30) NOT NULL,
article TEXT NOT NULL,
CONSTRAINT article_pkey PRIMARY KEY(articleid),
CONSTRAINT article_id_employee_idfkey FOREIGN KEY(authorid)
REFERENCES employees
)`;

const dropgifsTable = 'DROP TABLE IF EXISTS gifs CASCADE';
const gifTable = `CREATE TABLE IF NOT EXISTS gifs(
gifid serial NOT NULL,
authorid serial,
title VARCHAR(30) NOT NULL,
imageurl text NOT NULL,
CONSTRAINT gif_pkey PRIMARY KEY(gifid),
CONSTRAINT gif_id_employee_idfkey FOREIGN KEY(authorid)
REFERENCES employees
)`;

const dropArticleCommentTable = 'DROP TABLE IF EXISTS comments_articles CASCADE';
const commentArticleTable = `CREATE TABLE IF NOT EXISTS comments_articles(
commentid serial NOT NULL,
authorid serial,
articleid serial,
comment TEXT NOT NULL,
CONSTRAINT comment_article_pkey PRIMARY KEY(commentid),
CONSTRAINT article_comment_id_employee_idfkey FOREIGN KEY(authorid)REFERENCES employees,
CONSTRAINT article_comment_id_article_idfkey FOREIGN KEY(articleid)
REFERENCES articles
)`;

const dropGifCommentTable = 'DROP TABLE IF EXISTS comments_gifs CASCADE';
const gifCommentTable = `CREATE TABLE IF NOT EXISTS comments_gifs(
commentid serial NOT NULL,
authorid serial,
gifid serial,
comment TEXT NOT NULL,
CONSTRAINT comment_gif_pkey PRIMARY KEY(commentid),
CONSTRAINT gif_comment_id_employee_idfkey FOREIGN KEY(authorid)
REFERENCES employees,
CONSTRAINT gif_comment_id_article_idfkey FOREIGN KEY(gifid)
REFERENCES gifs
)`;

class Table {
  static async createTables() {
    await DB.query(dropGifCommentTable);
    await DB.query(dropArticleCommentTable);
    await DB.query(dropgifsTable);
    await DB.query(dropArticleTable);
    await DB.query(dropEmpTable);

    await DB.query(employeTable);
    await DB.query(gifTable);
    await DB.query(articleTable);
    await DB.query(commentArticleTable);
    await DB.query(gifCommentTable);
  }
}

export default Table.createTables().catch((error) => console.log('error', error));
