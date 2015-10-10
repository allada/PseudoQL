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
    table1: {
        name: 'TablE1',
        fields: {
            id: {
                type: Config.NUMERIC,
            },
            name: {
                type: Config.STRING,
            },
            linkField1: {
                type: Config.NUMERIC,
            },
        },
        linkTo: {
            link1: {
                table: 'linkTo1',
                pql: 'eq(linkField1,link1.id)',
            },
        },
        linkFrom: {
            link2: {
                table: 'linkFrom2',
                pql: 'eq(id, link2.linkId)',
            },
        },
    },
    linkTo1: {
        name: 'linkTB1',
        fields: {
            id: {
                type: Config.NUMERIC,
            },
            name: {
                type: Config.STRING,
            },
        },
        linkFrom: {
            linkTable1: {
                table: 'table1',
                pql: 'eq(id, linkTable1.linkField1)',
            }
        },
    },
    linkFrom2: {
        name: 'linkTB2',
        fields: {
            id: {
                type: Config.NUMERIC,
            },
            linkId: {
                type: Config.NUMERIC,
            },
            name: {
                type: Config.STRING,
            },
        },
        linkTo: {
            linkTable1: {
                table: 'table1',
                pql: 'eq(linkId, linkTable1.id)',
            }
        },
    },
};

import { EQUAL }        from  './../pql/opcodes/comparitors/equal.js';
import { GREATER_THAN } from  './../pql/opcodes/comparitors/greater_than.js';
import { LESS_THAN }    from  './../pql/opcodes/comparitors/less_than.js';
import { LIKE }         from  './../pql/opcodes/comparitors/like.js';
import { NO_VALUE }     from  './../pql/opcodes/comparitors/no_value.js';
import { NOT_EQUAL }    from  './../pql/opcodes/comparitors/not_equal.js';
import { NOT_LIKE }     from  './../pql/opcodes/comparitors/not_like.js';

import { CONSTANTS_ARRAY } from './../pql/opcodes/constants_array.js';
import { NULL } from './../pql/opcodes/null.js';

Config.FUNCTION_MAP  = {
    eq: {
        description: 'Compares two values',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new EQUAL(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    gt: {
        description: 'Checks if first value is greater than second',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new GREATER_THAN(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    lt: {
        description: 'Checks if first value is less than second',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new LESS_THAN(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    ne: {
        description: 'Checks if values are not equal',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new NOT_EQUAL(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    like: {
        description: 'Checks if first value is like second. % sign is wild card character',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new LIKE(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    not_like: {
        description: 'Checks if first value is not like second. % sign is wild card character',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new NOT_LIKE(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    'in': {
        description: 'Checks if first value is any of the following values',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var out_args = [];
            var obj = new EQUAL(pql);
            orig_args.splice(1).forEach((v) => {
                out_args.push(v);
            });
            obj.setLeft(orig_args[0]);
            obj.setRight(new CONSTANTS_ARRAY(pql, out_args));
            return obj.getSQL(query_obj);
        },
    },
    not_in: {
        description: 'Checks if first value is not any of the following values',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var out_args = [];
            var obj = new NOT_EQUAL(pql);
            orig_args.splice(1).forEach((v) => {
                out_args.push(v);
            });
            obj.setLeft(orig_args[0]);
            obj.setRight(new CONSTANTS_ARRAY(pql, out_args));
            return obj.getSQL(query_obj);
        },
    },
    'if': {
        description: 'If first argument is truethy returns second argument otherwise returns third',
        min_args: 3,
        max_args: 3,
        return_type: Config.ANY,
        format: ['IF(', Config.ALL_ARGS, ')'],
    },
    /* Math functions */
    add: {
        description: 'Adds values together',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.NUMBER,
        format: function (args, orig_args, query_obj){
            return args.join(' + ');
        },
    },
    sub: {
        description: 'Subtracts values from eachother',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.NUMBER,
        format: function (args, orig_args, query_obj){
            return args.join(' - ');
        },
    },
    mul: {
        description: 'Multiplies values together',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.NUMBER,
        format: function (args, orig_args, query_obj){
            return args.join(' * ');
        },
    },
    div: {
        description: 'Divide values together',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.NUMBER,
        format: function (args, orig_args, query_obj){
            return args.join(' / ');
        },
    },
    mod: {
        description: 'Modulus values together',
        min_args: 2,
        max_args: 2,
        return_type: Config.NUMBER,
        format: ['MOD(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    pow: {
        description: 'Powers values together',
        min_args: 2,
        max_args: 2,
        return_type: Config.NUMBER,
        format: ['POW(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    sqrt: {
        description: 'Square roots a value',
        min_args: 1,
        max_args: 1,
        return_type: Config.NUMBER,
        format: ['SQRT(', Config.ARG1, ')'],
    },

    /* Standard SQL functions */
    abs: {
        description: 'Gets absolute value',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.NUMERIC,
        ],
        return_type: Config.NUMERIC,
        format: ['ABS(', Config.ARG1, ')'],
    },
    'char': {
        description: 'Gets character from numerical ascii character',
        min_args: 1,
        max_args: Infinity,
        arg_types: [
            Config.NUMERIC,
        ],
        return_type: Config.STRING,
        format: ['CHAR(', Config.ALL_ARGS, ')'],
    },
    coalesce: {
        description: 'Returns first non-null value from arguments',
        min_args: 1,
        max_args: Infinity,
        return_type: Config.ANY_TYPE,
        format: ['COALESCE(', Config.ALL_ARGS, ')'],
    },
    ifnull: {
        description: 'Returns first argument if not null otherwise returns second argument',
        min_args: 2,
        max_args: 2,
        return_type: Config.ANY_TYPE,
        format: ['IFNULL(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    instr: {
        description: 'Gets character position of argument two in argument one\'s string',
        min_args: 2,
        max_args: 2,
        return_type: Config.NUMERIC,
        arg_types: [
            Config.STRING,
            Config.STRING,
        ],
        format: ['INSTR(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    hex: {
        description: 'Returns hex value of argument',
        min_args: 1,
        max_args: 1,
        return_type: Config.STRING,
        format: ['HEX(', Config.ARG1, ')'],
    },
    length: {
        description: 'Returns the string length',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.NUMERIC,
        format: ['LENGTH(', Config.ARG1, ')'],
    },
    lower: {
        description: 'Returns string converted to lower case',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['LOWER(', Config.ARG1, ')'],
    },
    ltrim: {
        description: 'Returns left-trimmed string',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['LTRIM(', Config.ARG1, ')'],
    },
    nullif: {
        description: 'Returns null if argument one equals argument two',
        min_args: 2,
        max_args: 2,
        return_type: Config.ANY_TYPE,
        format: ['NULLIF(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    random: {
        description: 'Returns random number (platform dependent)',
        min_args: 0,
        max_args: 0,
        return_type: Config.NUMERIC,
        format: ['RANDOM()'],
    },
    replace: {
        description: 'Searches for argument two and replaces matches with argument three in argument one',
        min_args: 3,
        max_args: 3,
        arg_types: [
            Config.STRING,
            Config.STRING,
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['REPLACE(', Config.ARG1, ', ', Config.ARG2, ', ', Config.ARG3, ')'],
    },
    round: {
        description: 'Returns rounded value of argument one with decimal percision of argument two',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.NUMERIC,
        ],
        return_type: Config.NUMERIC,
        format: ['ROUND(', Config.ALL_ARGS, ')'],
    },
    rtrim: {
        description: 'Returns right-trimmed value',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['RTRIM(', Config.ARG1, ')'],
    },
    substr: {
        description: 'Returns part of argument one string from argument two position with length of argument three',
        min_args: 2,
        max_args: 3,
        arg_types: [
            Config.STRING,
            Config.NUMERIC,
            Config.NUMERIC,
        ],
        return_type: Config.STRING,
        format: ['SUBSTR(', Config.ALL_ARGS, ')'],
    },
    trim: {
        description: 'Returns full trimmed string',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['TRIM(', Config.ARG1, ')'],
    },
    upper: {
        description: 'Returns value converted to upper case',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['UPPER(', Config.ARG1, ')'],
    },
    concat: {
        description: 'Returns multiple strings joined together',
        min_args: 1,
        max_args: Infinity,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['CONCAT(', Config.ALL_ARGS, ')'],
    },

    /* Date Functions */
    date_format: {
        description: 'Returns date converted converted using format of argument two',
        min_args: 2,
        max_args: 2,
        arg_types: [
            Config.DATE,
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['DATE_FORMAT(', Config.ARG1, ', ', Config.ARG2,')'],
    },
    date: {
        description: 'Returns date porition of argument one',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.DATE,
        format: ['DATE(', Config.ARG1, ')'],
    },
    day: {
        description: 'Returns day number of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['DAY(', Config.ARG1, ')'],
    },
    from_unixtime: {
        description: 'Returns date type from unix timestamp',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.NUMERIC,
        ],
        return_type: Config.DATE,
        format: ['FROM_UNIXTIME(', Config.ARG1, ')'],
    },
    hour: {
        description: 'Returns hour portion of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['HOUR(', Config.ARG1, ')'],
    },
    minute: {
        description: 'Returns minute porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['MINUTE(', Config.ARG1, ')'],
    },
    month: {
        description: 'Returns month number porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['MONTH(', Config.ARG1, ')'],
    },
    now: {
        description: 'Returns current time/date',
        min_args: 0,
        max_args: 0,
        return_type: Config.DATE,
        format: ['NOW()'],
    },
    second: {
        description: 'Returns second porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['SECOND(', Config.ARG1, ')'],
    },
    time: {
        description: 'Returns time porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.STRING,
        format: ['TIME(', Config.ARG1, ')'],
    },
    unix_timestamp: {
        description: 'Returns unix timestamp from date',
        min_args: 0,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['UNIX_TIMESTAMP(', Config.ARG1, ')'],
    },
    year: {
        description: 'Returns year porition from date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['YEAR(', Config.ARG1, ')'],
    },

    /* Aggregate functions */
    avg: {
        description: 'Returns average value',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.BOOLEAN,
        ],
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
        description: 'Returns count of items',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.BOOLEAN,
        ],
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
        description: 'Returns the group concatinated string',
        min_args: 1,
        max_args: Infinity,
        arg_types: [
            Config.STRING,
            Config.BOOLEAN,
            Config.STRING,
            Config.STRING,
            Config.STRING,
        ],
        return_type: Config.STRING,
        is_group_function: true,
        format: (args, orig_args) => {
            let distinct = (orig_args.length >= 2) && Boolean(Number(orig_args[1].getValue())) ? 'DISTINCT ' : '';
            let seperator = '';
            if (orig_args.length >= 3) {
                if (!orig_args[2].isConstant() && !(orig_args[2].isInstanceOf(NULL))) {
                    throw `Third argument of "group_concat" function must be a constant type`;
                }
                if (!(orig_args[2].isInstanceOf(NULL))) {
                    seperator = ` SEPARATOR ${ args[2] }`;
                }
            }
            let order_bys = new Set;
            if (orig_args.length > 3) {
                // Check to make sure there are always pairs of order_by_expression and order_by_direction
                if (orig_args.length % 2 == 0) {
                    throw `GROUP_CONCAT function must have order_by_expression and order_by_direction in pairs`
                }
                // Inc in order of 2's
                for (let i = 3; i < args.length; i=i+2) {
                    let dir = 'ASC';
                    if (orig_args[i+1].isConstant()) {
                        dir = orig_args[i+1].getValue().toString().toLowerCase() == 'desc' ? 'DESC' : 'ASC';
                    }
                    order_bys.add(`${ args[i] } ${ dir }`);
                }
            }
            let order_by;
            if (order_bys.size) {
                order_by = ` ORDER BY ${ Array.from(order_bys).join(',') }`
            } else {
                order_by = '';
            }
            return `GROUP_CONCAT(${ distinct }${ args[0] }${ order_by }${ seperator })`;
        },
    },
    max: {
        description: 'Returns maximum value',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.BOOLEAN,
        ],
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
        description: 'Returns minimum value',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.BOOLEAN,
        ],
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
        description: 'Returns sum of values',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.BOOLEAN,
        ],
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
    having: {
        description: 'Forces item into having statment',
        min_args: 1,
        max_args: 1,
        return_type: Config.ANY,
        is_group_function: true,
        format: [Config.ARG1],
    }
};

Config.COMPARITORS = new Set([
    EQUAL,
    GREATER_THAN,
    LESS_THAN,
    LIKE,
    NO_VALUE,
    NOT_EQUAL,
    NOT_LIKE,
]);