const { exec } = require('child_process');
const { generatorPaths, templatePaths } = require('../constants');
const { pascalCase, camelCase } = require('../utils');

/**
 *
 * @typedef {import('plop').AddActionConfig} AddActionConfig - Action config plop
 * @typedef {import('plop').PlopGenerator} GeneratorConfig - Generator config plop
 * @typedef {{ name: string; isCombineContext: boolean }} Data - Prompt props
 */

/**
 * @type {GeneratorConfig}
 */
const generatorConfig = {
  description: 'Create a context',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Context name',
    },
    {
      type: 'confirm',
      name: 'isCombineContext',
      message: 'Add this context to combine context?',
    },
  ],
  actions: (/** @type {Data} */ data) => {
    /** @type {AddActionConfig[]} */
    const actions = [
      {
        type: 'add',
        path: `${generatorPaths.contexts}/{{camelCase name}}/index.tsx`,
        templateFile: `${templatePaths.contexts}/index.tsx.hbs`,
      },
      {
        type: 'add',
        path: `${generatorPaths.contexts}/{{camelCase name}}/types.ts`,
        templateFile: `${templatePaths.contexts}/types.ts.hbs`,
      },
      {
        type: 'modify',
        path: `${generatorPaths.contexts}/index.ts`,
        transform: (template, /** @type {Data} */ actionData) => {
          const exportDefaultName = pascalCase(actionData.name);
          const fromFileName = camelCase(actionData.name);
          const templateToAppend = `export { default as ${exportDefaultName}Provider } from './${fromFileName}';`;

          return `${templateToAppend}\n${template}`;
        },
      },
    ];

    if (data.isCombineContext) {
      actions.push(
        // Add import if have any imports
        {
          type: 'modify',
          path: `${generatorPaths.contexts}/RootContext.tsx`,
          pattern: /( } from '\.';\n)+/g,
          template: `, {{pascalCase name}}Provider } from '.';\n`,
        },
        // Add import if not have imports
        {
          type: 'modify',
          path: `${generatorPaths.contexts}/RootContext.tsx`,
          pattern: /(import {} from '\.';\n)+/g,
          template: `import { {{pascalCase name}}Provider } from '.';\n`,
        },
        {
          type: 'append',
          path: `${generatorPaths.contexts}/RootContext.tsx`,
          pattern: /(\/\/ Init Providers\n)+/g,
          separator: '',
          template: '{{pascalCase name}}Provider,\n',
        },
      );

      actions.push(() => {
        const cmd = 'yarn prettier --write src/contexts/RootContext.tsx';
        exec(cmd, (err, result) => {
          if (err) throw err;
          process.stdout.write(result);
        });
        return 'Prettier formatted RootContext file';
      });
    }

    return actions;
  },
};

module.exports = generatorConfig;
