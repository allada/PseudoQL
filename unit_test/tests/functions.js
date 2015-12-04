import { PQL } from './../../pql/PQL.js';
import { Config } from './../test_config.js';

window.QUnit.test('Functions - eq', function (assert) {
  var query = PQL.getSQL({
    query: 'eq(id,name)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" = "TablE1"."name" GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - ne', function (assert) {
  var query = PQL.getSQL({
    query: 'ne(id, name)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" != "TablE1"."name" GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - lt', function (assert) {
  var query = PQL.getSQL({
    query: 'lt(5, 3)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'5\' < \'3\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - gt', function (assert) {
  var query = PQL.getSQL({
    query: 'gt(-5.11, 31)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'-5.11\' > \'31\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - like', function (assert) {
  var query = PQL.getSQL({
    query: 'LIKE(id, "foodbar")',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" LIKE \'foodbar%\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - not_like', function (assert) {
  var query = PQL.getSQL({
    query: 'NoT_LikE(id, "%foodbar")',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" NOT LIKE \'%foodbar%\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - in', function (assert) {
  var query = PQL.getSQL({
    query: 'in(id, name, 5, 3, 4, 1)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."id" IN ("TablE1"."name", 5, 3, 4, 1) GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - not_in', function (assert) {
  var query = PQL.getSQL({
    query: 'not_in(name, concat("Foo", "BAR + ", id), 5, 3, 4, 1)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE "TablE1"."name" NOT IN (CONCAT(\'Foo\', \'BAR + \', "TablE1"."id"), \'5\', \'3\', \'4\', \'1\') GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - if', function (assert) {
  var query = PQL.getSQL({
    query: 'IF(LIKE(CONCAT(id, "-", name), CONCAT(link1.id, "-", link2.id, "%")), -, 1)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" LEFT JOIN "linkTB1" AS "a0" ON "TablE1"."linkField1" = "a0"."id" LEFT JOIN "linkTB2" AS "a1" ON "TablE1"."id" = "a1"."linkId" WHERE IF(CONCAT("TablE1"."id", \'-\', "TablE1"."name") LIKE CONCAT("a0"."id", \'-\', "a1"."id", \'%\'), NULL, \'1\') GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - add', function (assert) {
  var query = PQL.getSQL({
    query: 'add(4, id, 2)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'4\' + "TablE1"."id" + \'2\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - sub', function (assert) {
  var query = PQL.getSQL({
    query: 'sub(4, 2)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'4\' - \'2\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - mul', function (assert) {
  var query = PQL.getSQL({
    query: 'MuL(4, 2)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'4\' * \'2\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - div', function (assert) {
  var query = PQL.getSQL({
    query: 'DIV(4, 2)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE \'4\' / \'2\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - mod', function (assert) {
  var query = PQL.getSQL({
    query: 'MOD(4, 2)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE MOD(\'4\', \'2\') GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - pow', function (assert) {
  var query = PQL.getSQL({
    query: 'pow(4, 2)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE POW(\'4\', \'2\') GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - sqrt', function (assert) {
  var query = PQL.getSQL({
    query: 'sqrt(4)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE SQRT(\'4\') GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - abs', function (assert) {
  var query = PQL.getSQL({
    query: 'abs(4)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE ABS(\'4\') GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - char', function (assert) {
  var query = PQL.getSQL({
    query: 'char(4):1',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE CHAR(\'4\') = \'1\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - coalesce', function (assert) {
  var query = PQL.getSQL({
    query: 'coalesce(4,-):1',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE COALESCE(\'4\', NULL) = \'1\' GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - ifnull', function (assert) {
  var query = PQL.getSQL({
    query: 'ifnull(id, "foobar")',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" WHERE IFNULL("TablE1"."id", \'foobar\') GROUP BY "TablE1"."id"', "Passed!");
});
window.QUnit.test('Functions - avg', function (assert) {
  var query = PQL.getSQL({
    query: 'avg(id)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING AVG("TablE1"."id")', "Passed!");
});
window.QUnit.test('Functions - count', function (assert) {
  var query = PQL.getSQL({
    query: 'count(id) > 21',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING COUNT("TablE1"."id") > 21', "Passed!");
});
window.QUnit.test('Functions - group_concat 1', function (assert) {
  var query = PQL.getSQL({
    query: 'group_concat(name)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING GROUP_CONCAT("TablE1"."name")', "Passed!");
});
window.QUnit.test('Functions - group_concat distinct', function (assert) {
  var query = PQL.getSQL({
    query: 'group_concat(name, 1)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING GROUP_CONCAT(DISTINCT "TablE1"."name")', "Passed!");
});
window.QUnit.test('Functions - group_concat non distinct 1', function (assert) {
  var query = PQL.getSQL({
    query: 'group_concat(name, 0)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING GROUP_CONCAT("TablE1"."name")', "Passed!");
});
window.QUnit.test('Functions - group_concat non distinct 2', function (assert) {
  var query = PQL.getSQL({
    query: 'group_concat(name, -)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING GROUP_CONCAT("TablE1"."name")', "Passed!");
});
window.QUnit.test('Functions - group_concat distinct separator', function (assert) {
  var query = PQL.getSQL({
    query: 'group_concat(name, 1, "-")',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING GROUP_CONCAT(DISTINCT "TablE1"."name" SEPARATOR \'-\')', "Passed!");
});
window.QUnit.test('Functions - group_concat distinct null separator', function (assert) {
  var query = PQL.getSQL({
    query: 'group_concat(name, 1, -)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING GROUP_CONCAT(DISTINCT "TablE1"."name")', "Passed!");
});
window.QUnit.test('Functions - group_concat distinct separator w/ sort desc', function (assert) {
  var query = PQL.getSQL({
    query: 'group_concat(name, 1, "!", id, "desc")',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING GROUP_CONCAT(DISTINCT "TablE1"."name" ORDER BY "TablE1"."id" DESC SEPARATOR \'!\')', "Passed!");
});
window.QUnit.test('Functions - group_concat distinct separator w/ sort asc', function (assert) {
  var query = PQL.getSQL({
    query: 'group_concat(name, 1, "!", id, "asc")',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING GROUP_CONCAT(DISTINCT "TablE1"."name" ORDER BY "TablE1"."id" ASC SEPARATOR \'!\')', "Passed!");
});
window.QUnit.test('Functions - group_concat distinct separator w/ sort null', function (assert) {
  var query = PQL.getSQL({
    query: 'group_concat(name, 1, "!", id, -)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING GROUP_CONCAT(DISTINCT "TablE1"."name" ORDER BY "TablE1"."id" ASC SEPARATOR \'!\')', "Passed!");
});
window.QUnit.test('Functions - max', function (assert) {
  var query = PQL.getSQL({
    query: 'max(id)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING MAX("TablE1"."id")', "Passed!");
});
window.QUnit.test('Functions - min', function (assert) {
  var query = PQL.getSQL({
    query: 'MIN(id)',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING MIN("TablE1"."id")', "Passed!");
});
window.QUnit.test('Functions - min', function (assert) {
  var query = PQL.getSQL({
    query: 'having(id) > 5',
    table: 'table1',
  });
  assert.ok(query.replace (/\s+/g, ' ') === 'SELECT * FROM "TablE1" GROUP BY "TablE1"."id" HAVING "TablE1"."id" > \'5\'', "Passed!");
});