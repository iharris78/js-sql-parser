'use strict';

const debug = require('debug')('js-sql-parser');
const parser = require('../');

const testParser = function (sql) {
  let firstAst = parser.parse(sql);
  console.log(JSON.stringify(firstAst, null, 2));

  return firstAst;
};

describe('insert grammar support', function () {

  it('test0', function () {
    testParser('select * from t where 1 + 2 and 3 + 4 and func(a, b, c);');
  });

  it('test1', function () {
    testParser('insert into t (a, b, c) values ((select _id from tb where true), "e", "f");');
  });

  it('test1,5', function () {
    testParser('insert into t (a, b, c) values ((select _id from tb where true), "e", "f") on duplicate key update b = "e", c = "f";');
  });

  it('test2', function () {
    testParser('update t set a = 1, b = 2, c = 3 where _id = "abcdef";');
  });

  it('test3', function () {
    testParser('delete from t where _id = "abcdef"; update t set a = 1, b = 2, c = 3 where _id = "abcdef";');
  });

  it('test3', function () {
    testParser('trash from t where _id = "abcdef";');
  });

});
