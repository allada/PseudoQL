import { PQL } from './../../pql/PQL.js';
import { Config } from './../test_config.js';

window.QUnit.test('Constants 1 - Strings', function (assert) {
  var query = PQL.getSQL({
    query: '"id"',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'id\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Constants 2 - Strings', function (assert) {
  var query = PQL.getSQL({
    query: '"id" \'id\'',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'id\' AND \'id\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Constants 3 - Numbers', function (assert) {
  var query = PQL.getSQL({
    query: '54',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'54\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Constants 4 - Negative Numbers', function (assert) {
  var query = PQL.getSQL({
    query: '-54',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'-54\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Constants 5 - Negative Numbers Decimal', function (assert) {
  var query = PQL.getSQL({
    query: '-54.1234',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'-54.1234\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Constants 6 - Positive Numbers Decimal', function (assert) {
  var query = PQL.getSQL({
    query: '154.1234',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'154.1234\' GROUP BY "TablE1"."id"', "Passed!");
});