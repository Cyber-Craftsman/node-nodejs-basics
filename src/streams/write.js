import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

  const writeStream = createWriteStream(filePath);

  console.log('Please enter text. To finish and save the file, type ":exit" and press Enter.');

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    const input = chunk.trim();

    if (input === ':exit') {
      writeStream.end();
      process.stdin.pause();
    } else {
      writeStream.write(chunk);
    }
  });

  writeStream.on('finish', () => {
    console.log('Data has been written successfully.');
  });

  writeStream.on('error', (error) => {
    console.error('Error writing to file:', error.message);
  });
};

await write();
