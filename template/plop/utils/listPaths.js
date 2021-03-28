const fs = require('fs');
const path = require('path');

/**
 * List paths
 * @param {'components' | 'pages'} type - Type to list paths
 * @returns {string[]}
 */
function listPaths(type) {
  return fs
    .readdirSync(path.join(__dirname, `../../src/${type}`))
    .filter((item) => !item.includes('.'))
    .concat('[Create]');
}

module.exports = listPaths;
