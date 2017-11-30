/**
 * Created by Charlie on 2017-10-14.
 */

export enum Day {
    Monday,
    TuesDay,
    WednesDay,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

// Array version fo days
let keys = Object.keys(Day);
export const weekdays = keys.slice(keys.length / 2);