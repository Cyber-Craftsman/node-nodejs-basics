import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  const readStream = createReadStream(filePath);
  let lastChunk = '';

  readStream.on('data', (chunk) => {
    process.stdout.write(chunk);
    lastChunk = chunk.toString();
  });

  readStream.on('end', () => {
    if (!lastChunk.endsWith('\n')) {
      process.stdout.write('\n');
    }
  });

  readStream.on('error', (error) => {
    console.error('Error reading file:', error.message);
  });
};

await read();
