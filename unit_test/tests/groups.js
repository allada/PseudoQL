import { PQL } from './../../pql/PQL.js';
import { Config } from './../test_config.js';

window.QUnit.test('Group OR', function (assert) {
  var query = PQL.getSQL({
    query: '(link1.id:5 | link2.name~foo)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" LEFT JOIN "linkTB2" AS "a1" ON "TablE1"."id" = "a1"."linkId" WHERE "a0"."id" = 5 OR "a1"."name" LIKE \'foo%\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Group Multi', function (assert) {
  var query = PQL.getSQL({
    query: '(link1.id:5 | link2.name~foo) id:4',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" LEFT JOIN "linkTB2" AS "a1" ON "TablE1"."id" = "a1"."linkId" WHERE ( "a0"."id" = 5 OR "a1"."name" LIKE \'foo%\' ) AND "TablE1"."id" = 4 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Group Multi-Multi 1', function (assert) {
  var query = PQL.getSQL({
    query: '(link1.id:5 | link2.name~foo) (id:4)',
    table: 'table1',
  });
  // If only 1 item in group it does not wrap it
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" LEFT JOIN "linkTB2" AS "a1" ON "TablE1"."id" = "a1"."linkId" WHERE ( "a0"."id" = 5 OR "a1"."name" LIKE \'foo%\' ) AND "TablE1"."id" = 4 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Group Multi-Multi 2', function (assert) {
  var query = PQL.getSQL({
    query: '(link1.id:5 | link2.name~foo) (id:4 name!:3)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" LEFT JOIN "linkTB2" AS "a1" ON "TablE1"."id" = "a1"."linkId" WHERE ( "a0"."id" = 5 OR "a1"."name" LIKE \'foo%\' ) AND ( "TablE1"."id" = 4 AND "TablE1"."name" != \'3\' ) GROUP BY "TablE1"."id"', "Passed!");
});