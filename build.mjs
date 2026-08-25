import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const files = ['index.html', 'app.js', 'style.css', 'navigation-v2.css', 'navigation-v2.js'];
mkdirSync('dist/server', { recursive: true });
for (const file of files) copyFileSync(file, `dist/${file}`);

let html = readFileSync('index.html', 'utf8');
const styles = `${readFileSync('style.css', 'utf8')}\n${readFileSync('navigation-v2.css', 'utf8')}`;
const scripts = `${readFileSync('app.js', 'utf8')}\n${readFileSync('navigation-v2.js', 'utf8')}`;

html = html
  .replace('<link rel="stylesheet" href="style.css" />', '')
  .replace('<link rel="stylesheet" href="navigation-v2.css" />', '')
  .replace('<script src="app.js"></script>', '')
  .replace('<script src="navigation-v2.js"></script>', '')
  .replace('</head>', `<style>${styles}</style></head>`)
  .replace('</body>', `<script>${scripts}</script></body>`);

const worker = `const page = ${JSON.stringify(html)};

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
    return new Response('Not found', { status: 404 });
  },
};
`;

writeFileSync('dist/server/index.js', worker);
