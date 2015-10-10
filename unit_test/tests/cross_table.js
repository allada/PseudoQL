import { PQL } from './../../pql/PQL.js';
import { Config } from './../test_config.js';

window.QUnit.test('Cross Table - Compare', function (assert) {
  var query = PQL.getSQL({
    query: 'link1.id:5',
    table: 'table1',
  });
  
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" WHERE "a0"."id" = 5 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Cross Table2 - Compare', function (assert) {
  var query = PQL.getSQL({
    query: 'link2.id:5',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB2" AS "a0" ON "TablE1"."id" = "a0"."linkId" WHERE "a0"."id" = 5 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Cross Table - Multi Tables 1', function (assert) {
  var query = PQL.getSQL({
    query: 'link1.linkTable1.link2.name~"foobar"',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" LEFT JOIN "TablE1" AS "a1" ON "a0"."id" = "a1"."linkField1" LEFT JOIN "linkTB2" AS "a2" ON "a1"."id" = "a2"."linkId" WHERE "a2"."name" LIKE \'foobar%\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Cross Table - Multi Tables 2', function (assert) {
  var query = PQL.getSQL({
    query: ' link2.linkTable1.link1.name ~ "foobar"',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB2" AS "a0" ON "TablE1"."id" = "a0"."linkId" LEFT JOIN "TablE1" AS "a1" ON "a0"."linkId" = "a1"."id" LEFT JOIN "linkTB1" AS "a2" ON "a1"."linkField1" = "a2"."id" WHERE "a2"."name" LIKE \'foobar%\' GROUP BY "TablE1"."id"', "Passed!");
});