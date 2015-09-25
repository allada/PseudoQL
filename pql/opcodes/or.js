import { SEPERATORS } from './seperators.js';

export class OR extends SEPERATORS {
    getSQL () {
        return 'OR';
    }
}
