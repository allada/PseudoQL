import { SEPERATORS } from './seperators.js';

export class SEPERATOR extends SEPERATORS {
    getSQL () {
        return ',';
    }
}
