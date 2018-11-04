/**
 * A schema is something like [[protocol]]://[[path]]?[[queryKeyValuePairsConnectedBy&]]
 */

const builtinOptions = {
  originalText: function(text) {
    return text;
  },
  encodedText: function(text) {
    return encodeURIComponent(text);
  }
};

export default {
  convert(pattern, text, options) {
    let result = pattern;
    if (!pattern) return text;
    Object.keys(builtinOptions).map(key => {
      const reg = new RegExp(`\\[\\[${key}\\]\\]`, "g");
      result = result.replace(reg, `${builtinOptions[key](text)}`);
    });

    Object.keys(options).map(key => {
      const reg = new RegExp(`\\[\\[${key}\\]\\]`, "g");
      result = result.replace(reg, `${options[key]}`);
    });
    return result;
  }
};
