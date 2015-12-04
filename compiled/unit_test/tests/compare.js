'use strict';

var _pqlPQLJs = require('./../../pql/PQL.js');

var _test_configJs = require('./../test_config.js');

window.QUnit.test('Compare Equal - Number', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id:5',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" = 5 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Equal - String', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id:hello',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" = \'hello\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Equal - Caps String', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id:hEll0e',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" = \'hEll0e\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Equal - Double Quote', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id:"H\\"el\'l\\"-\x00"',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" = \'H"el\\\'l"-\\0\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Equal - Single Quote', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: " id : 'J0\\\'h\"n Smith' ",
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" = \'J0\\\'h"n Smith\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Not Equal - Number', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id!:5',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" != 5 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Not Equal - String', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id!:hello',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" != \'hello\' GROUP BY "TablE1"."id"', "Passed!");
});

window.QUnit.test('Compare Like - Number', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id~5',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" LIKE \'5%\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Like - String', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id~Hello45.4',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" LIKE \'Hello45.4%\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare NOT Like - Number', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id !~ -983.493',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" NOT LIKE \'-983.493%\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare NOT Like - String', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id !~ JOOOOe',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" NOT LIKE \'JOOOOe%\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Greater Than - Number Negative w/ Decimal', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id > -493.44',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" > -493.44 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Greater Than - String', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id > "HOSH\\".5"',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" > \'HOSH".5\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Less Than - String', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id < "HOSH\\".35"',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" < \'HOSH".35\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Less Than - Number', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id < 3',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" < 3 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare No Value - Basic', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare No Value - Spacer', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: ' id     ',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Equal - NULL', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id:-',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" IS NULL GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Not Equal - NULL', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id!:-',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" IS NOT NULL GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Not Like - NULL', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id!~-',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" IS NOT NULL GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Like - NULL', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id~-',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" IS NULL GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Like - NULL', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id~-',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" IS NULL GROUP BY "TablE1"."id"', "Passed!");
});

window.QUnit.test('Compare In List - Numbers', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id:[4,3,43,33]',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" IN (4, 3, 43, 33) GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Not In List - Numbers', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id!:[14,3,43,33]',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" NOT IN (14, 3, 43, 33) GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare In List - Numbers w/ Strings', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id:[5,3, 4, "Hi\\"o", \'33\']',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" IN (5, 3, 4, \'Hi"o\', 33) GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare In List - Negative Numbers w/ Decimal', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id:[-5,3  , -44.33]',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" IN (-5, 3, -44.33) GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Like In List - Strings', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id~[hI,l0w]',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE ("TablE1"."id" LIKE \'hI%\' OR "TablE1"."id" LIKE \'l0w%\') GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare NOT Like In List - Strings', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id!~[hI,l0w]',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE ("TablE1"."id" NOT LIKE \'hI%\' AND "TablE1"."id" NOT LIKE \'l0w%\') GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Compare Like In List - Numbers/Strings/Negative', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: ' id ~ [ foo, -1, 1.5, .3 , bar] ',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE ("TablE1"."id" LIKE \'foo%\' OR "TablE1"."id" LIKE \'-1%\' OR "TablE1"."id" LIKE \'1.5%\' OR "TablE1"."id" LIKE \'.3%\' OR "TablE1"."id" LIKE \'bar%\') GROUP BY "TablE1"."id"', "Passed!");
});