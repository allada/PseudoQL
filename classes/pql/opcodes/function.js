"use strict"
var PQL = window.PQL;
PQL.OPCODES.FUNCTION = function (pql_obj, fn_name){
    this.pql_obj = pql_obj;
    this.setFunctionName(fn_name);
};
    PQL.extend(PQL.OPCODES.FUNCTION, PQL.OPCODES.OPCODE);

PQL.OPCODES.FUNCTION.prototype.setArgs = function (args){
    this._arguments = args;
    return this;
};
PQL.OPCODES.FUNCTION.prototype.getMinArgs = function (){
    return this._fn_settings.min_args;
};
PQL.OPCODES.FUNCTION.prototype.getMaxArgs = function (){
    return this._fn_settings.max_args;
};
PQL.OPCODES.FUNCTION.prototype.getFuncName = function (){
    return this._fn_name;
};
PQL.OPCODES.FUNCTION.prototype.getFormat = function (){
    return this._fn_settings.format;
};
PQL.OPCODES.FUNCTION.prototype.setFunctionName = function (fn_name){
    if(!this.pql_obj.function_map || !this.pql_obj.function_map[fn_name]){
        throw "Function '" + fn_name + "' is not allowed or not defined";
    }
    this._fn_settings = this.pql_obj.function_map[fn_name];
    this._fn_name = fn_name;
};
PQL.OPCODES.FUNCTION.prototype.getSQL = function (query_object){
    var args = [],
        format = this.getFormat();
    for(var i=0;i<this._arguments.length;i++){
        args.push(this._arguments[i].getSQL(query_object));
    }
    return PQL.OPCODES.FUNCTION.buildFromFormat(format, args, this._arguments);
};
PQL.OPCODES.FUNCTION.buildFromFormat = function (format_arg, args, orig_args){
    var i = 0, len = format_arg.length, out = [], format;
    switch(typeof format_arg){
        case 'function':
            return format_arg(args, orig_args);
            break;
        case 'string':
            format_arg = [format_arg];
        case 'object':
            for(;i<len;i++){
                format = format_arg[i];
                switch(typeof format){
                    case 'string':
                        out.push(format);
                        break;
                    case 'number':
                        if(args.length > format && format >= 0){
                            out.push(args[format]);
                        }else{
                            throw "Format '" + format.join('') + "' tried to use argument with number out of range";
                        }
                        break;
                    case 'function':
                        out.push(format(args, orig_args));
                        break;
                    case 'object':
                        if(format[args.length]){
                            return PQL.OPCODES.FUNCTION.buildFromFormat(format[args.length], args);
                        }else{
                            throw "Format '" + JSON.stringify(format) + "' does not have key of '" + args.length + "'";
                        }
                        break;
                    default:
                        throw "Format '" + JSON.stringify(format) + "' does not have a valid type";
                }
            }
            return out.join('');
        default:
            throw "Format '" + JSON.stringify(format_arg) + "' is of unhandleable  type";
    }
};