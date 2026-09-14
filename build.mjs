import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const files = ['admin-definitions.js', 'admin-business.js', 'admin-workspace.js', 'admin-workspace.css', 'index.html', 'app.js', 'style.css', 'navigation-v2.css', 'navigation-v2.js', 'audit-workspace.js', 'audit-workspace.css', 'audit-template-demo.js', 'it-definitions.js', 'it-workspace.js', 'it-workspace.css', 'hr-definitions.js', 'hr-business.js', 'hr-workspace.js', 'hr-workspace.css', 'hr-employee-360-demo.js', 'hr-payroll-demo.js'];
mkdirSync('dist/server', { recursive: true });
for (const file of files) copyFileSync(file, `dist/${file}`);

const html = readFileSync('index.html', 'utf8');
const assets = Object.fromEntries([
  ['admin-definitions.js', 'application/javascript; charset=UTF-8'],
  ['admin-business.js', 'application/javascript; charset=UTF-8'],
  ['admin-workspace.js', 'application/javascript; charset=UTF-8'],
  ['admin-workspace.css', 'text/css; charset=UTF-8'],
  ['hr-business.js', 'application/javascript; charset=UTF-8'],
  ['hr-definitions.js', 'application/javascript; charset=UTF-8'],
  ['hr-workspace.js', 'application/javascript; charset=UTF-8'],
  ['hr-workspace.css', 'text/css; charset=UTF-8'],
  ['hr-employee-360-demo.js', 'application/javascript; charset=UTF-8'],
  ['hr-payroll-demo.js', 'application/javascript; charset=UTF-8'],
  ['app.js', 'application/javascript; charset=UTF-8'],
  ['navigation-v2.js', 'application/javascript; charset=UTF-8'],
  ['style.css', 'text/css; charset=UTF-8'],
  ['navigation-v2.css', 'text/css; charset=UTF-8'],
  ['audit-workspace.js', 'application/javascript; charset=UTF-8'],
  ['audit-workspace.css', 'text/css; charset=UTF-8'],
  ['audit-template-demo.js', 'application/javascript; charset=UTF-8'],
  ['it-definitions.js', 'application/javascript; charset=UTF-8'],
  ['it-workspace.js', 'application/javascript; charset=UTF-8'],
  ['it-workspace.css', 'text/css; charset=UTF-8'],
].map(([file, contentType]) => [
  `/${file}`,
  { body: readFileSync(file, 'utf8'), contentType },
]));

const worker = `const page = ${JSON.stringify(html)};
const assets = ${JSON.stringify(assets)};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(page, {
        headers: {
          'content-type': 'text/html; charset=UTF-8',
          'cache-control': 'no-store',
        },
      });
    }
    const asset = assets[url.pathname];
    if (asset) {
      return new Response(asset.body, {
        headers: {
          'content-type': asset.contentType,
          'cache-control': 'no-store',
        },
      });
    }
    return new Response('Not found', { status: 404 });
  },
};
`;

writeFileSync('dist/server/index.js', worker);
