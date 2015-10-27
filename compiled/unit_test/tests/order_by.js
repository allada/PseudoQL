'use strict';

var _pqlPQLJs = require('./../../pql/PQL.js');

var _test_configJs = require('./../test_config.js');

window.QUnit.test('Order By DESC w/ GroupFn', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    orderBys: {
      'count(id)': 'desc'
    },
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" ORDER BY COUNT("TablE1"."id") DESC', "Passed!");
});
window.QUnit.test('Order By ASC w/ GroupFn', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    orderBys: {
      'count(id)': 'asc'
    },
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" ORDER BY COUNT("TablE1"."id") ASC', "Passed!");
});
window.QUnit.test('Order By ASC (unknown by) w/ GroupFn', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    orderBys: {
      'count(id)': ''
    },
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" ORDER BY COUNT("TablE1"."id") ASC', "Passed!");
});
window.QUnit.test('Order By ASC (null by) w/ GroupFn', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    orderBys: {
      'count(id)': null
    },
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" ORDER BY COUNT("TablE1"."id") ASC', "Passed!");
});
window.QUnit.test('Order By ASC (undefined by) w/ GroupFn', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    orderBys: {
      'count(id)': undefined
    },
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" ORDER BY COUNT("TablE1"."id") ASC', "Passed!");
});
window.QUnit.test('Order By Multi', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    orderBys: {
      'count(id)': undefined,
      id: 'asc',
      name: 'desc'
    },
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" ORDER BY COUNT("TablE1"."id") ASC,"TablE1"."id" ASC,"TablE1"."name" DESC', "Passed!");
});