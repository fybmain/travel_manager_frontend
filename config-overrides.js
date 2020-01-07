const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1890ff',
      '@layout-header-background': '#001529',
      'menu-dark-submenu-bg': '#001529',
      '@menu-item-height': '50px',
      '@layout-header-height': '68px',
    },
  }),
);