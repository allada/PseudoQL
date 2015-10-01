export class Config {
    static ALL_ARGS (args) {
        return args.join(', ');
    };
}
/* Database types */
Config.NUMERIC       = {
    is_numeric: true,
};
Config.DATE          = {
    is_numeric: false,
};
Config.STRING        = {
    is_numeric: false,
};
Config.BOOLEAN       = {
    is_numeric: true,
};
Config.ANY_TYPE      = {
    is_numeric: false,
};

/* These are to make it easier to read the code for the function definitions */
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
                type: Config.NUMERIC,
            },
            order_created: {
                type: Config.DATE,
            },
            customer_id: {
                type: Config.NUMERIC,
            },
            order_total: {
                type: Config.NUMERIC,
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
                type: Config.NUMERIC,
            },
            name: {
                type: Config.STRING,
            },
            address1: {
                type: Config.STRING,
            },
            address2: {
                type: Config.STRING,
            },
            city: {
                type: Config.STRING,
            },
            state: {
                type: Config.STRING,
            },
            postalcode: {
                type: Config.STRING,
            },
        },
        linkTo: {},
        linkFrom: {
            orders: {
                table: 'order',
                psudoql: 'eq(orders.customer_id;,id;);',
            },
        },
    },
};

Config.FUNCTION_MAP  = {
    eq: {
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: [Config.ARG1, ' = ', Config.ARG2],
    },
    gt: {
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: [Config.ARG1, ' > ', Config.ARG2],
    },
    lt: {
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: [Config.ARG1, ' < ', Config.ARG2],
    },
    ne: {
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: [Config.ARG1, ' != ', Config.ARG2],
    },
    like: {
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: [Config.ARG1, ' LIKE ', function (args, orig_args){}],
    },
    not_like: {
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: [Config.ARG1, ' NOT LIKE ', Config.ARG2],
    },
    'in': {
        min_args: 1,
        max_args: Infinity,
        return_type: Config.BOOLEAN,
        format: ['IN(', Config.ALL_ARGS, ')'],
    },
    not_in: {
        min_args: 1,
        max_args: Infinity,
        return_type: Config.BOOLEAN,
        format: ['NOT IN(', Config.ALL_ARGS, ')'],
    },
    'if': {
        min_args: 3,
        max_args: 3,
        return_type: Config.ANY,
        format: ['IF(', Config.ALL_ARGS, ')'],
    },

    /* Standard SQL functions */
    abs: {
        min_args: 1,
        max_args: 1,
        return_type: Config.NUMERIC,
        format: ['ABS(', Config.ARG1, ')'],
    },
    'char': {
        min_args: 1,
        max_args: Infinity,
        return_type: Config.STRING,
        format: ['CHAR(', Config.ALL_ARGS, ')'],
    },
    coalesce: {
        min_args: 1,
        max_args: 1,
        return_type: Config.ANY_TYPE,
        format: ['COALESCE(', Config.ARG1, ')'],
    },
    ifnull: {
        min_args: 2,
        max_args: 2,
        return_type: Config.ANY_TYPE,
        format: ['IFNULL(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    instr: {
        min_args: 2,
        max_args: 2,
        return_type: Config.NUMERIC,
        format: ['INSTR(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    hex: {
        min_args: 1,
        max_args: 1,
        return_type: Config.STRING,
        format: ['HEX(', Config.ARG1, ')'],
    },
    length: {
        min_args: 1,
        max_args: 1,
        return_type: Config.NUMERIC,
        format: ['LENGTH(', Config.ARG1, ')'],
    },
    lower: {
        min_args: 1,
        max_args: 1,
        return_type: Config.STRING,
        format: ['LOWER(', Config.ARG1, ')'],
    },
    ltrim: {
        min_args: 1,
        max_args: 1,
        return_type: Config.STRING,
        format: ['LTRIM(', Config.ARG1, ')'],
    },
    nullif: {
        min_args: 2,
        max_args: 2,
        return_type: Config.ANY_TYPE,
        format: ['NULLIF(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    random: {
        min_args: 0,
        max_args: 0,
        return_type: Config.NUMERIC,
        format: ['RANDOM()'],
    },
    replace: {
        min_args: 3,
        max_args: 3,
        return_type: Config.STRING,
        format: ['REPLACE(', Config.ARG1, ', ', Config.ARG2, ', ', Config.ARG3, ')'],
    },
    round: {
        min_args: 1,
        max_args: 2,
        return_type: Config.NUMERIC,
        format: ['ROUND(', Config.ALL_ARGS, ')'],
    },
    rtrim: {
        min_args: 1,
        max_args: 1,
        return_type: Config.STRING,
        format: ['RTRIM(', Config.ARG1, ')'],
    },
    substr: {
        min_args: 2,
        max_args: 3,
        return_type: Config.STRING,
        format: ['SUBSTR(', Config.ALL_ARGS, ')'],
    },
    trim: {
        min_args: 1,
        max_args: 1,
        return_type: Config.STRING,
        format: ['TRIM(', Config.ARG1, ')'],
    },
    upper: {
        min_args: 1,
        max_args: 1,
        return_type: Config.STRING,
        format: ['UPPER(', Config.ARG1, ')'],
    },
    upper: {
        min_args: 1,
        max_args: 1,
        return_type: Config.STRING,
        format: ['UPPER(', Config.ARG1, ')'],
    },
    concat: {
        min_args: 1,
        max_args: Infinity,
        return_type: Config.STRING,
        format: ['CONCAT(', Config.ALL_ARGS, ')'],
    },

    /* Date Functions */
    date_format: {
        min_args: 2,
        max_args: 2,
        return_type: Config.STRING,
        format: ['DATE_FORMAT(', Config.ARG1, ', ', Config.ARG2,')'],
    },
    date: {
        min_args: 1,
        max_args: 1,
        return_type: Config.DATE,
        format: ['DATE(', Config.ARG1, ')'],
    },
    day: {
        min_args: 1,
        max_args: 1,
        return_type: Config.NUMERIC,
        format: ['DAY(', Config.ARG1, ')'],
    },
    from_unixtime: {
        min_args: 1,
        max_args: 1,
        return_type: Config.DATE,
        format: ['FROM_UNIXTIME(', Config.ARG1, ')'],
    },
    hour: {
        min_args: 1,
        max_args: 1,
        return_type: Config.NUMERIC,
        format: ['HOUR(', Config.ARG1, ')'],
    },
    hour: {
        min_args: 1,
        max_args: 1,
        return_type: Config.NUMERIC,
        format: ['HOUR(', Config.ARG1, ')'],
    },
    minute: {
        min_args: 1,
        max_args: 1,
        return_type: Config.NUMERIC,
        format: ['MINUTE(', Config.ARG1, ')'],
    },
    month: {
        min_args: 1,
        max_args: 1,
        return_type: Config.NUMERIC,
        format: ['MONTH(', Config.ARG1, ')'],
    },
    now: {
        min_args: 0,
        max_args: 0,
        return_type: Config.DATE,
        format: ['NOW()'],
    },
    second: {
        min_args: 1,
        max_args: 1,
        return_type: Config.NUMERIC,
        format: ['SECOND(', Config.ARG1, ')'],
    },
    time: {
        min_args: 1,
        max_args: 1,
        return_type: Config.STRING,
        format: ['TIME(', Config.ARG1, ')'],
    },
    unix_timestamp: {
        min_args: 0,
        max_args: 1,
        return_type: Config.NUMERIC,
        format: ['UNIX_TIMESTAMP(', Config.ALL_ARGS, ')'],
    },
    year: {
        min_args: 1,
        max_args: 1,
        return_type: Config.NUMERIC,
        format: ['YEAR(', Config.ARG1, ')'],
    },

    /* Aggregate functions */
    avg: {
        min_args: 1,
        max_args: 2,
        return_type: Config.NUMERIC,
        is_group_function: true,
        format: {
            1: ['AVG(', Config.ARG1, ')'],
            2: [(args, orig_args) => {
                let distinct = Boolean(Number(orig_args[1].getValue()));
                if (distinct) {
                    return `AVG(DISTINCT ${ args[0] }`;
                }
                return `AVG(${ args[0] }`;
            }],
        },
    },
    count: {
        min_args: 1,
        max_args: 2,
        return_type: Config.NUMERIC,
        is_group_function: true,
        format: {
            1: ['COUNT(', Config.ARG1, ')'],
            2: [(args, orig_args) => {
                let distinct = Boolean(Number(orig_args[1].getValue()));
                if (distinct) {
                    return `COUNT(DISTINCT ${ args[0] }`;
                }
                return `COUNT(${ args[0] }`;
            }],
        },
    },
    // group_concat(expr[,distinct[,seperator[,order_by_expression,order_by_direction ...]]]);
    group_concat: {
        min_args: 1,
        max_args: Infinity,
        return_type: Config.STRING,
        is_group_function: true,
        format: (args, orig_args) => {
            let distinct = (orig_args.length >= 2) && Boolean(Number(orig_args[1].getValue())) ? 'DISTINCT ' : '';
            let seperator;
            if (orig_args.length >= 3) {
                if (!orig_args[2].isConstant()) {
                    throw `Third argument of "group_concat" function must be a constant type`;
                }
                seperator = ` SEPARATOR ${ args[2] }`;
            }
            let order_bys = new Set;
            if (orig_args.length > 3) {
                // Check to make sure there are always pairs of order_by_expression and order_by_direction
                if (orig_args.length % 2 == 0) {
                    throw `GROUP_CONCAT function must have order_by_expression and order_by_direction in pairs`
                }
                // Inc in order of 2's
                for (let i = 3; i < args.length; i=i+2) {
                    let dir = orig_args[i+1].getValue().toString().toLowerCase() == 'desc' ? 'DESC' : 'ASC';
                    order_bys.add(`${ args[i] } ${ dir }`);
                }
            }
            let order_by;
            if (order_bys.size) {
                order_by = ` ORDER BY ${ order_bys.values().join(', ') }`
            } else {
                order_by = '';
            }
            return `GROUP_CONCAT(${ distinct }${ args[0] }${ order_by }${ seperator })`;
        },
    },
    max: {
        min_args: 1,
        max_args: 2,
        return_type: Config.NUMERIC,
        is_group_function: true,
        format: {
            1: ['MAX(', Config.ARG1, ')'],
            2: [(args, orig_args) => {
                let distinct = Boolean(Number(orig_args[1].getValue()));
                if (distinct) {
                    return `MAX(DISTINCT ${ args[0] }`;
                }
                return `MAX(${ args[0] }`;
            }],
        },
    },
    min: {
        min_args: 1,
        max_args: 2,
        return_type: Config.NUMERIC,
        is_group_function: true,
        format: {
            1: ['MIN(', Config.ARG1, ')'],
            2: [(args, orig_args) => {
                let distinct = Boolean(Number(orig_args[1].getValue()));
                if (distinct) {
                    return `MIN(DISTINCT ${ args[0] }`;
                }
                return `MIN(${ args[0] }`;
            }],
        },
    },
    sum: {
        min_args: 1,
        max_args: 2,
        return_type: Config.NUMERIC,
        is_group_function: true,
        format: {
            1: ['SUM(', Config.ARG1, ')'],
            2: [(args, orig_args) => {
                let distinct = Boolean(Number(orig_args[1].getValue()));
                if (distinct) {
                    return `SUM(DISTINCT ${ args[0] }`;
                }
                return `SUM(${ args[0] }`;
            }],
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