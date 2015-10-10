import { PQL } from './../../pql/PQL.js';
import { Config } from './../test_config.js';

window.QUnit.test('Variable 1', function (assert) {
  var query = PQL.getSQL({
    query: 'id:@id',
    table: 'table1',
    variables: {
        id: 3,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" = 3 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Variable 2', function (assert) {
  var query = PQL.getSQL({
    query: 'id:@no_value',
    table: 'table1',
    variables: {
        id: 3,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" IS NULL GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Variable 3', function (assert) {
  var query = PQL.getSQL({
    query: 'id:@no_value|id:@id',
    table: 'table1',
    variables: {
        id: -3,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" IS NULL OR "TablE1"."id" = -3 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Variable 4', function (assert) {
  var query = PQL.getSQL({
    query: 'id:@no_value|count(ifnull(id,@val))>@amt',
    table: 'table1',
    variables: {
        val: "1",
        amt: 3,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING "TablE1"."id" IS NULL OR COUNT(IFNULL("TablE1"."id", \'1\')) > \'3\'', "Passed!");
});
window.QUnit.test('Variable 5', function (assert) {
  var query = PQL.getSQL({
    query: '(id:@no_value|count(ifnull(id,@val))>@amt) if(count(@id) > -009, @amt, - )',
    table: 'table1',
    variables: {
        id: 4,
        val: "1",
        amt: 3,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING ( "TablE1"."id" IS NULL OR COUNT(IFNULL("TablE1"."id", \'1\')) > \'3\' ) IF(COUNT(\'4\') > \'-009\', \'3\', NULL)', "Passed!");
});
window.QUnit.test('Variable 6', function (assert) {
  var query = PQL.getSQL({
    query: '(id:3 eq(7,count(@id)))',
    table: 'table1',
    variables: {
      id: 0,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" = 3 GROUP BY "TablE1"."id" HAVING \'7\' = COUNT(\'0\')', "Passed!");
});
window.QUnit.test('Variable 7', function (assert) {
  var query = PQL.getSQL({
    query: '(id:3|eq(7,ifnull(count(@id),1)))',
    table: 'table1',
    variables: {
      id: 0,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING "TablE1"."id" = 3 OR \'7\' = IFNULL(COUNT(\'0\'), \'1\')', "Passed!");
});
window.QUnit.test('Variable 8', function (assert) {
  var query = PQL.getSQL({
    query: '(id:3 | eq(7,ifnull(count(@id),1))) id < -',
    table: 'table1',
    variables: {
      id: 0,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" < NULL GROUP BY "TablE1"."id" HAVING ( "TablE1"."id" = 3 OR \'7\' = IFNULL(COUNT(\'0\'), \'1\') )', "Passed!");
});