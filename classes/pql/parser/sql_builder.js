"use strict"
PQL.PARSER.SQL_BUILDER = function (query_object){
    this._query_object = query_object;
};
PQL.PARSER.SQL_BUILDER.prototype.toString = function (){
    return this._query_object.getSQL(this);
};
PQL.PARSER.SQL_BUILDER.prototype._table_refs = {};
PQL.PARSER.SQL_BUILDER.prototype.next_i = 0;
PQL.PARSER.SQL_BUILDER.prototype.setJoin = function (table_ary){
    // Join on null character just because it's almost never going to be in a table name or field name
    var table_str = table_ary.join("\0");
    if(this._table_refs[table_str]){
        return this._table_refs[table_str];
    }
    // Using base 36 just because it will recude the total size of the query... Really it's just for the hell of it.
    // Using 'a' because.... Why not?
    var i, j, table_data;
    for(i in this._query_object.db_map){
        if(this._query_object.db_map.hasProperty(i)){
            table_data = this._query_object.db_map[i];
            if(table_data.linkTo[i]){
            }else if(table_data.linkFrom[i]){
                
            }else{
                throw i + '';
            }
        }
    }
    return this._table_refs[table_str] = 'a' + this.next_i.toString(36);
};