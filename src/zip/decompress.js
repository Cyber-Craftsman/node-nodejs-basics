import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const inputFilePath = path.join(__dirname, 'files', 'archive.gz');
  const outputFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

  const readStream = createReadStream(inputFilePath);
  const gunzipStream = createGunzip();
  const writeStream = createWriteStream(outputFilePath);

  readStream.on('error', (err) => {
    console.error('Read error:', err.message);
  });

  gunzipStream.on('error', (err) => {
    console.error('Decompression error:', err.message);
  });

  writeStream.on('error', (err) => {
    console.error('Write error:', err.message);
  });

  readStream
    .pipe(gunzipStream)
    .pipe(writeStream)
    .on('finish', () => {
      console.log('File has been decompressed successfully.');
    });
};

await decompress();
