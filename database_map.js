"use strict"
window.DB_SETTINGS = {};
window.DB_SETTINGS.TYPES = {
    INT:        0,
    TIMESTAMP:  1,
    VARCHAR:    2
};
window.DB_SETTINGS.DB_MAP = {
    order: {
        name: 'order',
        fields: {
            id: {
                type: window.DB_SETTINGS.TYPES.INT,
                auto_inc: true,
                zero_fill: false,
                def: 'NULL',
                size: 11,
                nullable: false
            },
            order_created: {
                type: window.DB_SETTINGS.TYPES.TIMESTAMP,
                auto_inc: false,
                zero_fill: false,
                def: 'UNIX_TIMESTAMP',
                size: null,
                nullable: false
            },
            customer_id: {
                type: window.DB_SETTINGS.TYPES.INT,
                auto_inc: false,
                zero_fill: false,
                def: 'NULL',
                size: 11,
                nullable: true
            }
        },
        linkTo: {
            customer: 'eq(customer_id;,customer.id;);'
        },
        linkFrom: {}
    },
    customer: {
        name: 'customer',
        fields: {
            id: {
                type: window.DB_SETTINGS.TYPES.INT,
                auto_inc: true,
                zero_fill: false,
                def: 'NULL',
                size: 11,
                nullable: false
            },
            name: {
                type: window.DB_SETTINGS.TYPES.VARCHAR,
                auto_inc: false,
                zero_fill: false,
                def: "''",
                size: 255,
                nullable: false
            }
        },
        linkTo: {},
        linkFrom: {
            orders: 'eq(order.id;,id;);'
        }
    }
};
window.DB_SETTINGS.ALL_ARGS_FUNC = function (args){
    return args.join(', ');
};
window.DB_SETTINGS.FUNCTION_MAP = {
    eq: {
        min_args: 2,
        max_args: 2,
        format: [0, ' = ', 1]
    },
    gt: {
        min_args: 2,
        max_args: 2,
        format: [0, ' > ', 1]
    },
    lt: {
        min_args: 2,
        max_args: 2,
        format: [0, ' < ', 1]
    },
    ne: {
        min_args: 2,
        max_args: 2,
        format: [0, ' != ', 1]
    },
    like: {
        min_args: 2,
        max_args: 2,
        format: [0, ' LIKE ', 1]
    },
    not_like: {
        min_args: 2,
        max_args: 2,
        format: [0, ' NOT LIKE ', 1]
    },
    'in': {
        min_args: 1,
        max_args: Infinity,
        format: ['IN(', window.DB_SETTINGS.ALL_ARGS_FUNC, ')']
    },
    not_in: {
        min_args: 1,
        max_args: Infinity,
        format: ['NOT IN(', window.DB_SETTINGS.ALL_ARGS_FUNC, ')']
    },
    length: {
        min_args: 1,
        max_args: 1,
        format: ['LENGTH(', 0, ')']
    },
    concat: {
        min_args: 1,
        max_args: Infinity,
        format: ['CONCAT(', window.DB_SETTINGS.ALL_ARGS_FUNC, ')']
    },
    lower: {
        min_args: 1,
        max_args: 1,
        format: ['LOWER(', 0, ')']
    },
    upper: {
        min_args: 1,
        max_args: 1,
        format: ['UPPER(', 0, ')']
    },
    substring: {
        min_args: 2,
        max_args: 3,
        format: ['SUBSTRING(', window.DB_SETTINGS.ALL_ARGS_FUNC, ')']
    },
    trim: {
        min_args: 1,
        max_args: 2,
        format: {
            1: ['TRIM(', 0, ')'],
            2: ['TRIM(', 0, ' FROM ', 1, ')'],
        }
    },
    count: {
        min_args: 1,
        max_args: 1,
        is_group_function: true,
        format: ['COUNT(', 0, ')']
    },
    match: {
        min_args: 3,
        max_args: Infinity,
        returns: window.DB_SETTINGS.TYPES.INT,
        format: function (args, orig_args){
            var against = args[0],
                type = orig_args[1],
                fields = [];
            if(type instanceof PQL.OPCODES.NULL){
                type = '';
            }else if(type instanceof PQL.OPCODES.CONSTANT){
                var type_value = type.getValue().toUpperCase();
                if(type_value == 'BOOLEAN'){
                    type = ' IN BOOLEAN MODE';
                }else if(type_value == 'EXPANSION'){
                    type = ' WITH QUERY EXPANSION';
                }else if(type_value == '' || type_value instanceof PQL.OPCODES.NULL){
                    type = '';
                }else{
                    throw "Second argument of 'match' must be constant of 'BOOLEAN' or 'EXPANSION' or ''";
                }
            }else{
                throw "Second argument of 'match' must be constant of 'BOOLEAN' or 'EXPANSION' or ''";
            }
            args = args.slice(2);
            for(var i=0;i<args.length;i++){
                if(!(orig_args[i + 2] instanceof PQL.OPCODES.FIELD)){
                    // Remember to add 1 because array starts at 0 and field count starts at 1
                    throw "Argument " + (i + 3) + " must be a field field in function 'match'";
                }
            }
            return ['MATCH(', args.join(','), ') AGAINST (', against, type, ')', ].join('')
        }
    }
};