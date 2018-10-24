/**
 * A schema is something like [[protocol]]://[[path]]?[[queryKeyValuePairsConnectedBy&]]
 */
export default {
    convert(pattern, url, options) {
        let result = pattern;
        const encodedUrl = encodeURIComponent(url);
        result = result.replace(/\[\[encodedUrl\]\]/g, `url=${encodedUrl}`);


        Object.keys(options).map(key => {
            const reg = new RegExp(`\\[\\[${key}\\]\\]`, 'g');
            result = result.replace(reg, `${key}=${options[key]}`);
        })
        return result;
    }
}