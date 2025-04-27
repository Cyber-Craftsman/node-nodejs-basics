import { Worker } from 'worker_threads';
import { cpus } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const workerPath = path.join(__dirname, 'worker.js');

  const numCores = cpus().length;
  const results = [];
  const workers = [];

  for (let i = 0; i < numCores; i++) {
    const n = 10 + i;
    const worker = new Worker(workerPath, { workerData: n });

    workers.push(
      new Promise((resolve) => {
        worker.on('message', (msg) => {
          results[i] = msg;
          resolve();
        });
        worker.on('error', () => {
          results[i] = { status: 'error', data: null };
          resolve();
        });
        worker.on('exit', (code) => {
          if (code !== 0) {
            results[i] = { status: 'error', data: null };
          }
          resolve();
        });
      })
    );
  }

  await Promise.all(workers);
  console.log(results);
};

await performCalculations();
