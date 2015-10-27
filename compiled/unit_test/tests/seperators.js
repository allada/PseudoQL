'use strict';

var _pqlPQLJs = require('./../../pql/PQL.js');

var _test_configJs = require('./../test_config.js');

window.QUnit.test('Seperators - AND 1', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'link1.id:5 link1.id~"FOO BAR"',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" WHERE "a0"."id" = 5 AND "a0"."id" LIKE \'FOO BAR%\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Seperators - AND 2', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: ' link1.id: -504.1 link2.id~"FOO BAR" id!:44',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" LEFT JOIN "linkTB2" AS "a1" ON "TablE1"."id" = "a1"."linkId" WHERE "a0"."id" = -504.1 AND "a1"."id" LIKE \'FOO BAR%\' AND "TablE1"."id" != 44 GROUP BY "TablE1"."id"', "Passed!");
});

window.QUnit.test('Seperators - AND 3', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id: yo id!:-',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" = \'yo\' AND "TablE1"."id" IS NOT NULL GROUP BY "TablE1"."id"', "Passed!");
});

window.QUnit.test('Seperators - OR 1', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id | name!"FOO"',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" OR "TablE1"."name" NOT LIKE \'FOO%\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Seperators - OR 2', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id | name!"FOO" | link1.id~"FOO BAR"',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" WHERE "TablE1"."id" OR "TablE1"."name" NOT LIKE \'FOO%\' OR "a0"."id" LIKE \'FOO BAR%\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Seperators - Mix', function (assert) {
  var query = _pqlPQLJs.PQL.getSQL({
    query: 'id | name!"FOO" link1.id~"FOO BAR"',
    table: 'table1'
  });
  assert.ok(query.replace(/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" WHERE "TablE1"."id" OR "TablE1"."name" NOT LIKE \'FOO%\' AND "a0"."id" LIKE \'FOO BAR%\' GROUP BY "TablE1"."id"', "Passed!");
});