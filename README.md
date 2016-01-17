# PseudoQL (PQL)
PseudoQL is a Pseudo-Query-Language.

Live Demo: http://allada.github.io/PseudoQL/

###PseudoQL goals:###
- Make it easier and faster to develop for relational databases.
- Make a more-universal query language which should make it easier to deploy the same code on multiple database engines.
- Faster query building by introducing compare shortcuts and smart-type-recognition and many other features.
- Safer query building by allowing variable injection (much like prepared-queries) and hackable opt-codes.
- Allow front-end users a standard simple language to make complex custom queries.
- Auto join on tables based on pre-configured (or runtime-configured) database relation map.
- Auto HAVING vs WHERE recognition w/ ability to force items into HAVING.

###Reasoning###
One of the problems with SQL is that each database engine uses a slightly different version of SQL. For example, MySQL uses `` (back-ticks) to designate an identifier (table name, database name, column name, exc...) and SQL server uses \[\] (brackets) and PostgreSQL uses "" (double quotes). Although this is not a major issue to code around it, there are other situations which make moving from one database to another a very large hassle like  the random (RAND(), RANDOM(), RND(), exc...) function; MySQL aliases RAND() and RANDOM() as the same function producing a number between 0 and 1 (with decimal), where PostgreSQL does not have RAND() function instead uses RANDOM() to do the same thing... However SQL server does not have RANDOM() function and instead uses RAND(). This kind of example can be quite difficult to code around because a "new" database engine may spawn and uses arguments in a different order or may not have the function at all and expect the user to do the grunt work to get the same results or the inverse may happen.

Security is also an issue. Although some database engines have "prepared-statements" it can be slow if many queries are being ran at once and some database engines do not support prepared-statements at all. This causes many developers to use libraries to escape their code for them or escape their code them selves which for novice developers can cause huge security holes.

Since many modern developers develop using a "model" system (where each row of the database spawns a new object of a class representing the table from the database) this causes a few problems:
- Each framework uses a different set of functions to query the database and developers often need to learn multiple ways of querying within the framework
- Frameworks can sometimes be limiting in what they allow you to query
- Frameworks often require you to join tables yourself when the framework sometimes knows how tables relate
- Frameworks offer little security limiting users (front end users) to only records they should have access to and expect the developer to limit every query them-selves when the entire application could know the limits

###Model Limiting Rows Explanation###
Many companies have had security breaches due to non-conventional means of extracting data through the user interface unexpectedly. Assuming the developer(s) are extremely careful about SQL injection vulnerabilities this often is not the only way to extract information. For example, a user may do a request for a report from the server asking about a list of that user's orders and in the query may be asking to join on the users table (user that entered the order) and unless the developers were mindful the framework/controller may respond back with anything from password info/hash to that user's address/phone/ip/email information.

By running the framework through PQL first, the developer could configure the PQL parser to add additional restrictions on joins which should have very little impact on query speeds. For example:
```SQL
SELECT * FROM order LEFT JOIN user ON user.id = order.creator_id WHERE order.buyer_user_id = 5
```
```SQL
SELECT * FROM order LEFT JOIN user ON user.id = order.creator_id AND user.id = 5 WHERE order.buyer_user_id = 5
```
The second sample would ensure the results are the same, but would not return anything where it wasn't their own user (assuming the user's id was 5). This would also be useful in cases where a table did not contain the information about who was in control of the record (like a linking table). You could have the parser auto-join the parent table and do additional filtering to ensure the user is not getting records they should not have access to.

###Examples###
```javascript
// Simple query to get single order
PQL.getSQL({
  query: 'id:@order_id',
  table: 'order',
  variables: {
    order_id: 45,
  },
});
```
```SQL
-- Result:
SELECT
	*
FROM "orders"
WHERE
	"orders"."id" = 45
GROUP BY
	"orders"."id"
```
```javascript
// Use of array searching
// 1)
PQL.getSQL({
  query: 'id:[3, 5, 2]',
  table: 'order',
});
// 2)
PQL.getSQL({
  query: 'id~[3, 5, 2]',
  table: 'order',
});
```
```SQL
-- Result 1:
SELECT
	*
FROM "orders"
WHERE
	"orders"."id" IN (3, 5, 2)
GROUP BY
	"orders"."id"
-- Result 2:
SELECT
	*
FROM "orders"
WHERE
	("orders"."id" LIKE '3%' OR "orders"."id" LIKE '5%' OR "orders"."id" LIKE '2%')
GROUP BY
	"orders"."id"
```
```javascript
// Super complex query
PQL.getSQL({
  query: 'customer_id:@customer_id count(if(product_items_reports.product.brand_id:1054, 1, -)) > 1',
  table: 'order',
  group: 'id',
  orderBy: {
    'sum(product_items_reports.sell_price)': 'desc',
  },
  selects: {
    order_id: 'id',
    order_total: 'sum(product_items_reports.sell_price)',
    total_item_qty_on_order: 'count(id)',
  },
  variables: {
    customer_id: 1000,
  },
});
```
```SQL
-- Result:
SELECT
	"orders"."id" AS "order_id",
	SUM("a0"."sell_price") AS "order_total",
	COUNT("orders"."id") AS "total_item_qty_on_order"
FROM "orders"
	LEFT JOIN "product_items_reports" AS "a0" ON "a0"."order_id" = "orders"."id"
	LEFT JOIN "products" AS "a1" ON "a0"."product_id" = "a1"."id"
WHERE
	"orders"."customer_id" = 1000
GROUP BY
	"orders"."id"
HAVING
	COUNT(IF("a1"."brand_id" = 1054, '1', NULL)) > '1'
```
