const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const themePath = './src/assets/styles/antd-custom-variables.less';
const themeFile = fs.readFileSync(path.join(__dirname, themePath), 'utf8');
const themeVariables = lessToJs(themeFile);

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: themeVariables,
  }),
);
