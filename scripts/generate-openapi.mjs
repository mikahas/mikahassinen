import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const API_DIR = join(ROOT, 'src/app/api');
const OUTPUT = join(ROOT, 'public/openapi.yaml');

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

function findRoutes(dir) {
  const routes = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...findRoutes(full));
    } else if (entry.name === 'route.ts' || entry.name === 'route.js') {
      routes.push(full);
    }
  }
  return routes;
}

function getMethods(routeFile) {
  const content = readFileSync(routeFile, 'utf-8');
  return HTTP_METHODS.filter(m =>
    new RegExp(`export\\s+(async\\s+)?function\\s+${m}\\b`).test(content)
  );
}

function routeToPath(routeFile) {
  const rel = relative(API_DIR, dirname(routeFile)).replace(/\\/g, '/');
  if (!rel || rel === '.') return '/';
  return '/' + rel.replace(/\[([^\]]+)\]/g, '{$1}');
}

const baseSpec = {
  openapi: '3.1.0',
  info: {
    title: 'mikahassinen.dev API',
    version: '1.0.0',
    description:
      'The unofficial, overly documented API of mikahassinen.dev.\nAll endpoints are intentionally useless and entirely delightful.\n',
  },
  servers: [{ url: '/api', description: 'Current server' }],
  tags: [
    { name: 'Essential Services', description: 'Core functionality powering the known universe' },
  ],
  paths: {},
};

const routes = findRoutes(API_DIR);

for (const routeFile of routes) {
  const apiPath = routeToPath(routeFile);
  const partialFile = join(dirname(routeFile), 'openapi.yaml');

  if (existsSync(partialFile)) {
    baseSpec.paths[apiPath] = yaml.load(readFileSync(partialFile, 'utf-8'));
  } else {
    const methods = getMethods(routeFile);
    const pathItem = {};
    for (const method of methods) {
      const opId = `${method.toLowerCase()}${apiPath.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+$/, '')}`;
      pathItem[method.toLowerCase()] = {
        summary: `${method} ${apiPath}`,
        operationId: opId,
        responses: { '200': { description: 'OK' } },
      };
    }
    baseSpec.paths[apiPath] = pathItem;
  }
}

writeFileSync(OUTPUT, yaml.dump(baseSpec, { lineWidth: -1 }));
console.log(`Generated public/openapi.yaml (${routes.length} route(s))`);
