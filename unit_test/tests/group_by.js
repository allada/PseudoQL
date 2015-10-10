import { PQL } from './../../pql/PQL.js';
import { Config } from './../test_config.js';

window.QUnit.test('Group By 1', function (assert) {
  var query = PQL.getSQL({
    query: '(link1.id:5 | link2.name~foo)',
    group: 'id,name,4,5',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" LEFT JOIN "linkTB2" AS "a1" ON "TablE1"."id" = "a1"."linkId" WHERE "a0"."id" = 5 OR "a1"."name" LIKE \'foo%\' GROUP BY "TablE1"."id" , "TablE1"."name" , \'4\' , \'5\'', "Passed!");
});
window.QUnit.test('Group By 2', function (assert) {
  var query = PQL.getSQL({
    group: '@testVar,@testVarStr,id',
    table: 'table1',
    variables: {
        testVar: 1,
        testVarStr: "hi"
    }
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY \'1\' , \'hi\' , "TablE1"."id"', "Passed!");
});
window.QUnit.test('Group By 3', function (assert) {
  var query = PQL.getSQL({
    group: '"h0Ei"',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY \'h0Ei\'', "Passed!");
});