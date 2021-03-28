const { generatorPaths, templatePaths } = require('../constants');
const { pascalCase } = require('../utils');

/**
 *
 * @typedef {import('plop').AddActionConfig} AddActionConfig - Action config plop
 * @typedef {import('plop').PlopGenerator} GeneratorConfig - Generator config plop
 * @typedef {{ name: string }} Data - Prompt props
 */

/**
 * @type {GeneratorConfig}
 */
const generatorConfig = {
  description: 'Create a hook',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Hook name',
    },
  ],
  actions: [
    {
      type: 'add',
      path: `${generatorPaths.hooks}/use{{pascalCase name}}/index.ts`,
      templateFile: `${templatePaths.hooks}/index.ts.hbs`,
    },
    {
      type: 'add',
      path: `${generatorPaths.hooks}/use{{pascalCase name}}/types.ts`,
      templateFile: `${templatePaths.hooks}/types.ts.hbs`,
    },
    {
      type: 'modify',
      path: `${generatorPaths.hooks}/index.ts`,
      transform: (template, /** @type {Data} */ data) => {
        const exportDefaultName = pascalCase(data.name);
        const fromFileName = pascalCase(data.name);
        const templateToAppend = `export { default as use${exportDefaultName} } from './use${fromFileName}';`;

        return `${templateToAppend}\n${template}`;
      },
    },
  ],
};

module.exports = generatorConfig;
