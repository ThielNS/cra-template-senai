const { generatorPaths, templatePaths } = require('../constants');
const { pascalCase, listPaths } = require('../utils');

/**
 *
 * @typedef {import('plop').AddActionConfig} AddActionConfig - Action config plop
 * @typedef {import('plop').PlopGenerator} GeneratorConfig - Generator config plop
 * @typedef {{ isParent: boolean; parentName: string; name: string }} Data - Prompt props
 */

/**
 * @type {GeneratorConfig}
 */
const generatorConfig = {
  description: 'Create a page',
  prompts: [
    {
      type: 'confirm',
      name: 'isParent',
      message: 'Add the page to a parent?',
    },
    {
      type: 'list',
      name: 'parentName',
      message: 'Select the parent',
      when: (/** @type {Data} */ data) => {
        return data.isParent;
      },
      choices: listPaths('pages'),
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
      message: 'Page name',
    },
  ],
  actions: (/** @type {Data} */ data) => {
    let parentPath = data.isParent ? '/{{pascalCase parentName}}' : '';

    /**
     * @type {AddActionConfig[]}
     */
    const actions = [
      {
        type: 'add',
        path: `${generatorPaths.pages}${parentPath}/{{pascalCase name}}/index.tsx`,
        templateFile: `${templatePaths.pages}/index.tsx.hbs`,
      },
    ];

    if (!data.isParent) {
      actions.push(
        {
          type: 'modify',
          path: `${generatorPaths.pages}/index.ts`,
          transform: (template, /** @type {Data} */ dataAction) => {
            const exportDefaultName = pascalCase(dataAction.name);
            const fromFileName = pascalCase(dataAction.name);
            const templateToAppend = `export { default as ${exportDefaultName}Page } from './${fromFileName}';`;

            return `${templateToAppend}\n${template}`;
          },
        },
        {
          type: 'modify',
          path: `${generatorPaths.routes}`,
          pattern: /( } from '\.\.\/pages';\n)+/g,
          template: `, {{pascalCase name}}Page } from '../pages';\n`,
        },
        {
          type: 'modify',
          path: `${generatorPaths.routes}`,
          pattern: /(\n} from '\.\.\/pages';\n)+/g,
          template: `  {{pascalCase name}}Page,\n} from '../pages';\n`,
        },
        {
          type: 'append',
          path: `${generatorPaths.routes}`,
          pattern: /(const routes: RouteCustomProps\[] = formatRoutes\(\[\n)+/g,
          separator: '',
          templateFile: `${templatePaths.pages}/route.hbs`,
        },
      );
    }

    return actions;
  },
};

module.exports = generatorConfig;
