function PQL_QUERY (module, query_string){
    this._select_data = [];
    this._query_data = [];
    this._group_data = [];
    this._order_data = [];
    this._limit = 100;
    this._offset = 0;
}
PQL_QUERY.prototype.select = function (select_query_ary){
    if(!select_query_ary instanceof Array){
        throw "First parameter of PQL_QUERY.select must be an array of Strings.";
    }
    var i = 0,
        len = select_query_ary.length,
        str;
    this._select_data = [];
    for(;i<len;i++){
        str = select_query_ary[i];
        if(str instanceof String){
            this._select_data.push(new PQL_OPERATION(str));
        }
    }
};