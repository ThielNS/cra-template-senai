/**
 * Camel Case
 * @param {string} text - Text to convert
 * @returns {string}
 */
function camelCase(text) {
  let texts = text.split(' ');

  if (texts.length) {
    texts = texts.map((textArr, index) =>
      index === 0
        ? `${textArr[0].toLowerCase()}${textArr.slice(1, textArr.length)}`
        : `${textArr[0].toUpperCase()}${textArr.slice(1, textArr.length)}`,
    );

    return texts.join('');
  }

  return `${text[0].toLowerCase()}${text.slice(1, text.length)}`;
}

module.exports = camelCase;
