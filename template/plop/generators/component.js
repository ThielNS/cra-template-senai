const { generatorPaths, templatePaths } = require('../constants');
const { listPaths, pascalCase } = require('../utils');

/**
 *
 * @typedef {import('plop').AddActionConfig} AddActionConfig - Action config plop
 * @typedef {import('plop').PlopGenerator} GeneratorConfig Generator config plop
 * @typedef {{ isParent: boolean; parentName: string; name: string }} Data - Prompt props
 */

/**
 * @type {GeneratorConfig}
 */
const generatorConfig = {
  description: 'Create a component',
  prompts: [
    {
      type: 'confirm',
      name: 'isParent',
      message: 'Add the component to a parent?',
    },
    {
      type: 'list',
      name: 'parentName',
      message: 'Select the parent',
      when: (/** @type {Data} */ data) => {
        return data.isParent;
      },
      choices: listPaths('components'),
    },
    {
      type: 'input',
      name: 'parentName',
      message: 'Parent name',
      askAnswered: true,
      when: (/** @type {Data} */ data) => {
        return data.parentName && data.parentName === '[Create]';
      },
    },
    {
      type: 'input',
      name: 'name',
      message: 'Component name',
    },
  ],
  actions: (/** @type {Data} */ data) => {
    let parentPath = data.isParent ? '/{{pascalCase parentName}}' : '';

    const actions = [
      {
        type: 'add',
        path: `${generatorPaths.components}${parentPath}/{{pascalCase name}}/index.tsx`,
        templateFile: `${templatePaths.components}/index.tsx.hbs`,
      },
    ];

    if (!data.isParent) {
      actions.push({
        type: 'modify',
        path: `${generatorPaths.components}/index.ts`,
        transform: (template, /** @type {Data} */ dataAction) => {
          const exportDefaultName = pascalCase(dataAction.name);
          const fromFileName = pascalCase(dataAction.name);
          const templateToAppend = `export { default as ${exportDefaultName} } from './${fromFileName}';`;

          return `${templateToAppend}\n${template}`;
        },
      });
    }

    return actions;
  },
};

module.exports = generatorConfig;
