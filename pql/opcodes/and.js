import { SEPERATORS } from './seperators.js';

export class AND extends SEPERATORS {
    getSQL () {
        return 'AND';
    }
}
