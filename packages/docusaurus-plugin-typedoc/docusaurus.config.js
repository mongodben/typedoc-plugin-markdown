// THIS IS A TEST CONFIG FILE FOR THE SPEC TESTS

const path = require('path');

const docusaurusPlugin = path.join(__dirname, 'dist');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  plugins: [
    [
      docusaurusPlugin,
      {
        tsconfig: './test/stubs/tsconfig.json',
        entryPoints: './test/stubs/src/*',
        out: './test/out/default',
        readme: 'none',
        cleanOutputDir: true,
        disableSources: true,
        hidePageHeader: true,
        hideBreadcrumb: true,
      },
    ],
    [
      docusaurusPlugin,
      {
        id: 'api-2',
        docsRoot: './test',
        tsconfig: './test/stubs/tsconfig.json',
        entryPoints: './test/stubs/src/module-1.ts',
        out: './test/out/global-members',
        readme: 'none',
        sidebar: { pretty: true },
        fileExtension: '.mdx',
        disableSources: true,
        hidePageHeader: true,
        hideBreadcrumb: true,
      },
    ],
    [
      docusaurusPlugin,
      {
        id: 'api-3',
        docsRoot: './test',
        tsconfig: './test/stubs/tsconfig.json',
        entryPoints: './test/stubs/src/links.ts',
        out: './test/out/links',
        readme: 'none',
        sidebar: { pretty: true },
        outputFileStrategy: 'modules',
        disableSources: true,
        hidePageHeader: true,
        hideBreadcrumb: true,
      },
    ],
  ],
};

module.exports = config;
