export const isDef = v => v !== undefined;
export const notEmpty = v => isDef(v) && v !== "";
export const notExist = v => v === undefined || v === null || v === "";
