
import bcrypt from 'bcryptjs';
import slugify from "slugify";

const saltRounds = 12;

export function slugifyText(value: string) {

    return slugify(value, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi',      // language code of the locale to use
        trim: true        // trim leading and trailing replacement chars, defaults to `true`        
    })
}

export function generateUUID() {

    let d = new Date().getTime();

    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
}

export function generateToken() {

    const uuid = generateUUID();
    const token = uuid.substring(0, 8).toUpperCase();

    const tokenArray = token.match(/.{1,4}/g);
    const tokenWithDash = tokenArray?.join('-');
    return tokenWithDash || '';
}

export function generateSuccinct(v1: string, v2: string) {
    return `${slugifyText(v1).toUpperCase()}_${slugifyText(v2).toUpperCase()}`;
}

export function generateHash(clearValue: string) {
    return bcrypt.hashSync(clearValue, saltRounds);
}

export function verifyHash(clearValue: string, hashValue: string) {

    return bcrypt.compareSync(clearValue, hashValue);
}