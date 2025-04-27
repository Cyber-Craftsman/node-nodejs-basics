import { rename as fsRename, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const rename = async () => {
  const sourcePath = path.resolve('src', 'fs', 'files', 'wrongFilename.txt');
  const destinationPath = path.resolve('src', 'fs', 'files', 'properFilename.md');

  try {
    await access(sourcePath, constants.F_OK);

    try {
      await access(destinationPath, constants.F_OK);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw new Error('FS operation failed');
      }
    }

    await fsRename(sourcePath, destinationPath);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await rename();
