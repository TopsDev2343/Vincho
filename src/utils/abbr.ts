import initials from 'initials';

export const abbr = (name:string) => {
    let abbr = initials(name);
    if (name.startsWith('+')) {
        abbr = `+${abbr}`;
    }
    if (!abbr) {
        console.warn('Could not get abbr from name');
        abbr = name;
    }
    if (abbr.length > 2) {
        abbr = abbr.substring(0, 2);
    }
    abbr = abbr.toUpperCase();

    return abbr;
};