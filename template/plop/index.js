const component = require('./generators/component');
const context = require('./generators/context');
const hook = require('./generators/hook');
const page = require('./generators/page');

/**
 *
 * @param {import('plop').NodePlopAPI} plop
 */
function plopConfig(plop) {
  plop.setGenerator('component', component);
  plop.setGenerator('context', context);
  plop.setGenerator('hook', hook);
  plop.setGenerator('page', page);
}

module.exports = plopConfig;
