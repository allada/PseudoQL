"use strict"
var PQL = window.PQL;
PQL.OPCODES.FUNCTION.function_settings = {
    sum: {
        name: 'SUM',
        min: 1,
        max: 1,
        group: true
    },
	avg: {
        name: 'AVG',
        min: 1,
        max: 1,
        group: true
    },
	count: {
        name: 'COUNT',
        min: 1,
        max: 1,
        group: true
    },
	countif: 'count(if(?,@1,@-););',
	max: {
        name: 'MAX',
        min: 1,
        max: 1,
        group: true
    },
	min: {
        name: 'MIN',
        min: 1,
        max: 1,
        group: true
    },
	count_distinct: {
        min: 1,
        max: 1,
        group: true,
        out: function (args){
            for(var i=0;i<args.length;i++){
               // args.
            }
        }
    },
	group_concat: {
        
    },
	group_concat_distinct: {
        
    }
};