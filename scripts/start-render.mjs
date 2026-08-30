import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const port = process.env.PORT || '10000';
const wrangler = fileURLToPath(
  new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url),
);

const server = spawn(
  process.execPath,
  [
    wrangler,
    'dev',
    '--config',
    'dist/server/wrangler.json',
    '--ip',
    '0.0.0.0',
    '--port',
    port,
  ],
  { stdio: 'inherit' },
);

server.on('exit', (code) => process.exit(code ?? 1));

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.kill(signal));
}
