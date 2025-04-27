import { writeFile, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const create = async () => {
  const filePath = path.resolve('src', 'fs', 'files', 'fresh.txt');
  try {
    await access(filePath, constants.F_OK);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeFile(filePath, 'I am fresh and young', 'utf-8');
    } else {
      throw new Error('FS operation failed');
    }
  }
};

await create();
