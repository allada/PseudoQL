import { OPCODE } from './opcode.js';

export class FUNCTION extends OPCODE {
    constructor (pql_obj, fn_name) {
        super(pql_obj, fn_name);

        this.setFunctionName(fn_name);
    }
    setArgs (args) {
        this._arguments = args;
        return this;
    }
    getMinArgs () {
        return this._fn_settings.min_args;
    }
    getMaxArgs () {
        return this._fn_settings.max_args;
    }
    getFuncName () {
        return this._fn_name;
    }
    getFormat () {
        return this._fn_settings.format;
    }
    setFunctionName (fn_name) {
        if (!this.getPqlObj().getConfig().FUNCTION_MAP || !this.getPqlObj().getConfig().FUNCTION_MAP[fn_name]) {
            throw `Function '${fn_name}' is not allowed or not defined`;
        }
        this._fn_settings = this.getPqlObj().getConfig().FUNCTION_MAP[fn_name];
        this._fn_name = fn_name;
    }
    getSQL (query_obj) {
        let args = [];

        this._arguments.forEach((v) => {
            args.push(v.getSQL(query_obj));
        });
        return FUNCTION.buildFromFormat(this.getFormat(), args, this._arguments);
    }
    static buildFromFormat (format_arg, args, orig_args) {
        let out = [];

        switch(typeof format_arg){
            case 'function':
                return format_arg(args, orig_args);
                break;
            case 'string':
                // Break does not need to go here because it needs to continue to 'object' section
                format_arg = [format_arg];
            case 'object':
                for (let format of format_arg) {
                    switch(typeof format){
                        case 'string':
                            out.push(format);
                            break;
                        case 'number':
                            if (args.length > format && format >= 0) {
                                out.push(args[format]);
                            } else {
                                throw `Format '${format.join('')}' tried to use argument with number out of range`;
                            }
                            break;
                        case 'function':
                            out.push(format(args, orig_args));
                            break;
                        case 'object':
                            if (format[args.length]) {
                                return PQL.OPCODES.FUNCTION.buildFromFormat(format[args.length], args);
                            } else {
                                throw `Format '${JSON.stringify(format)}' does not have key of '${args.length}'`;
                            }
                            break;
                        default:
                            throw `Format '${JSON.stringify(format)}' does not have a valid type`;
                    }
                }
                return out.join('');
            default:
                throw `Format '${JSON.stringify(format_arg)}' is of unhandleable type`;
        }
    }
}
