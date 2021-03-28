/**
 *
 * @param {string} text - Text to convert
 * @returns {string}
 */
function pascalCase(text) {
  let texts = text.split(' ');

  if (texts.length) {
    texts = texts.map(
      (textArr) =>
        `${textArr[0].toUpperCase()}${textArr.slice(1, textArr.length)}`,
    );

    return texts.join('');
  }

  return `${text[0].toUpperCase()}${text.slice(1, text.length)}`;
}

module.exports = pascalCase;
