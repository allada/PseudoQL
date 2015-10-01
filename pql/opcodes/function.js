import { OPCODE } from './opcode.js';

export class FUNCTION extends OPCODE {
    constructor (pql_obj, fn_name) {
        super(pql_obj, fn_name);

        this._needs_group_cache = null;
        this.setFunctionName(fn_name);
    }
    setArgs (args) {
        this._needs_group_cache = null;
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
        this._needs_group_cache = null;
        fn_name = fn_name.toLowerCase();
        if (!this.getPqlObj().getConfig().FUNCTION_MAP || !this.getPqlObj().getConfig().FUNCTION_MAP[fn_name]) {
            throw `Function '${fn_name}' is not allowed or not defined`;
        }
        this._fn_settings = this.getPqlObj().getConfig().FUNCTION_MAP[fn_name];
        this._fn_name = fn_name;
    }
    getFunctionSettings () {
        return this._fn_settings;
    }
    getSQL (query_obj) {
        let args = [];

        this._arguments.forEach((v) => {
            args.push(v.getSQL(query_obj));
        });
        return FUNCTION.buildFromFormat(this.getFormat(), args, this._arguments);
    }
    needsGroup () {
        if (this._needs_group_cache !== null) {
            return this._needs_group_cache;
        }
        if (this.getFunctionSettings().is_group_function) {
            return this._needs_group_cache = true;
        }
        for (let op_code of this._arguments) {
            if (op_code.needsGroup()) {
                return this._needs_group_cache = true;
            }
        }
        return this._needs_group_cache = false;
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
                // Check if is not array type
                if (!(format_arg instanceof Array)) {
                    if (format_arg[args.length] !== undefined) {
                        return this.buildFromFormat(format_arg[args.length], args, orig_args);
                    } else {
                        throw `Could not find ${ format_arg[args.length] } in format config for function`;
                    }
                }
                
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
                                return this.buildFromFormat(format[args.length], args);
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
