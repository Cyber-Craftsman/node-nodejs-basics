import { readFile, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const read = async () => {
  const filePath = path.resolve('src', 'fs', 'files', 'fileToRead.txt');

  try {
    await access(filePath, constants.F_OK);
    const content = await readFile(filePath, 'utf-8');

    console.log(content);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await read();
