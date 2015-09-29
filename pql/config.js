export class Config {
    static ALL_ARGS (args) {
        return args.join(', ');
    };
}
Config.INT           = {
    is_numeric: true,
};
Config.TIMESTAMP     = {
    is_numeric: false,
};
Config.VARCHAR       = {
    is_numeric: false,
};

Config.ARG1          = 0;
Config.ARG2          = 1;
Config.ARG3          = 2;
Config.ARG4          = 3;
Config.ARG5          = 4;
Config.ARG6          = 5;
Config.ARG7          = 6;
Config.ARG8          = 7;
Config.DB_MAP        = {
    order: {
        name: 'orders',
        fields: {
            id: {
                type: Config.INT,
                auto_inc: true,
                zero_fill: false,
                def: 'NULL',
                size: 11,
                nullable: false,
            },
            order_created: {
                type: Config.TIMESTAMP,
                auto_inc: false,
                zero_fill: false,
                def: 'UNIX_TIMESTAMP',
                size: null,
                nullable: false,
            },
            customer_id: {
                type: Config.INT,
                auto_inc: false,
                zero_fill: false,
                def: 'NULL',
                size: 11,
                nullable: true,
            },
        },
        linkTo: {
            customer: {
                table: 'customer',
                psudoql: 'eq(customer_id;,customer.id;);',
            },
        },
        linkFrom: {},
    },
    customer: {
        name: 'customers',
        fields: {
            id: {
                type: Config.INT,
                auto_inc: true,
                zero_fill: false,
                def: 'NULL',
                size: 11,
                nullable: false,
            },
            asdf: {
                type: Config.INT,
                auto_inc: true,
                zero_fill: false,
                def: 'NULL',
                size: 11,
                nullable: false,
            },
            name: {
                type: Config.VARCHAR,
                auto_inc: false,
                zero_fill: false,
                def: "''",
                size: 255,
                nullable: false,
            },
        },
        linkTo: {},
        linkFrom: {
            orders: {
                table: 'order',
                psudoql: 'eq(orders.order_created;,asdf;);',
            },
        },
    },
};

Config.FUNCTION_MAP  = {
    eq: {
        min_args: 2,
        max_args: 2,
        format: [Config.ARG1, ' = ', Config.ARG2],
    },
    gt: {
        min_args: 2,
        max_args: 2,
        format: [Config.ARG1, ' > ', Config.ARG2],
    },
    lt: {
        min_args: 2,
        max_args: 2,
        format: [Config.ARG1, ' < ', Config.ARG2],
    },
    ne: {
        min_args: 2,
        max_args: 2,
        format: [Config.ARG1, ' != ', Config.ARG2],
    },
    like: {
        min_args: 2,
        max_args: 2,
        format: [Config.ARG1, ' LIKE ', function (args, orig_args){}],
    },
    not_like: {
        min_args: 2,
        max_args: 2,
        format: [Config.ARG1, ' NOT LIKE ', Config.ARG2],
    },
    'in': {
        min_args: 1,
        max_args: Infinity,
        format: ['IN(', Config.ALL_ARGS, ')'],
    },
    not_in: {
        min_args: 1,
        max_args: Infinity,
        format: ['NOT IN(', Config.ALL_ARGS, ')'],
    },
    length: {
        min_args: 1,
        max_args: 1,
        format: ['LENGTH(', Config.ARG1, ')'],
    },
    concat: {
        min_args: 1,
        max_args: Infinity,
        format: ['CONCAT(', Config.ALL_ARGS, ')'],
    },
    lower: {
        min_args: 1,
        max_args: 1,
        format: ['LOWER(', Config.ARG1, ')'],
    },
    upper: {
        min_args: 1,
        max_args: 1,
        format: ['UPPER(', Config.ARG1, ')'],
    },
    substring: {
        min_args: 2,
        max_args: 3,
        format: ['SUBSTRING(', Config.ALL_ARGS, ')'],
    },
    trim: {
        min_args: 1,
        max_args: 2,
        format: {
            1: ['TRIM(', Config.ARG1, ')'],
            2: ['TRIM(', Config.ARG1, ' FROM ', Config.ARG2, ')'],
        },
    },
    count: {
        min_args: 1,
        max_args: 1,
        is_group_function: true,
        format: ['COUNT(', Config.ARG1, ')'],
    },
    match: {
        min_args: 3,
        max_args: Infinity,
        returns: Config.INT,
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
        },
    },
};

import { EQUAL }        from  './opcodes/comparitors/equal.js';
import { GREATER_THAN } from  './opcodes/comparitors/greater_than.js';
import { IN }           from  './opcodes/comparitors/in.js';
import { LESS_THAN }    from  './opcodes/comparitors/less_than.js';
import { LIKE }         from  './opcodes/comparitors/like.js';
import { NO_VALUE }     from  './opcodes/comparitors/no_value.js';
import { NOT_EQUAL }    from  './opcodes/comparitors/not_equal.js';
import { NOT_IN }       from  './opcodes/comparitors/not_in.js';
import { NOT_LIKE }     from  './opcodes/comparitors/not_like.js';
Config.COMPARITORS = new Set([
    EQUAL,
    GREATER_THAN,
    IN,
    LESS_THAN,
    LIKE,
    NO_VALUE,
    NOT_EQUAL,
    NOT_IN,
    NOT_LIKE,
]);