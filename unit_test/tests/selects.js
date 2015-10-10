import { PQL } from './../../pql/PQL.js';
import { Config } from './../test_config.js';

window.QUnit.test('Select 1', function (assert) {
  var query = PQL.getSQL({
    query: 'id:@id',
    table: 'table1',
    selects: {
        jo: 'count(id)'
    },
    variables: {
        id: 3,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT COUNT("TablE1"."id") AS "jo" FROM "TablE1" WHERE "TablE1"."id" = 3 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Select 2', function (assert) {
  var query = PQL.getSQL({
    query: 'id:@id',
    table: 'table1',
    selects: {
        jo: 'count(id)',
        jo: 'count(name)',
    },
    variables: {
        id: 3,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT COUNT("TablE1"."name") AS "jo" FROM "TablE1" WHERE "TablE1"."id" = 3 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Select 3', function (assert) {
  var query = PQL.getSQL({
    query: 'id:@id',
    table: 'table1',
    selects: {
        '"test"': 'count(@id)',
    },
    variables: {
        id: 3,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT COUNT(\'3\') AS """test"" FROM "TablE1" WHERE "TablE1"."id" = 3 GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Select 4', function (assert) {
  var query = PQL.getSQL({
    query: 'id:@id',
    table: 'table1',
    selects: {
        '': 'count(@id)',
        '*': '"blah"',
    },
    variables: {
        id: 3,
    },
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT COUNT(\'3\'), \'blah\' AS "*" FROM "TablE1" WHERE "TablE1"."id" = 3 GROUP BY "TablE1"."id"', "Passed!");
});