import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const inputFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const outputFilePath = path.join(__dirname, 'files', 'archive.gz');

  const readStream = createReadStream(inputFilePath);
  const gzipStream = createGzip();
  const writeStream = createWriteStream(outputFilePath);

  readStream.on('error', (err) => {
    console.error('Read error:', err.message);
  });

  gzipStream.on('error', (err) => {
    console.error('Compression error:', err.message);
  });

  writeStream.on('error', (err) => {
    console.error('Write error:', err.message);
  });

  readStream
    .pipe(gzipStream)
    .pipe(writeStream)
    .on('finish', () => {
      console.log('File has been compressed successfully.');
    });
};

await compress();
