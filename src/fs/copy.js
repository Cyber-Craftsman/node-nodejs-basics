import { mkdir, readdir, copyFile, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const copy = async () => {
  const sourceFolder = path.resolve('src', 'fs', 'files');
  const destinationFolder = path.resolve('src', 'fs', 'files_copy');

  try {
    await access(sourceFolder, constants.F_OK);

    try {
      await access(destinationFolder, constants.F_OK);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw new Error('FS operation failed');
      }
    }

    await mkdir(destinationFolder);

    const files = await readdir(sourceFolder);

    const copyPromises = files.map((file) => {
      const sourcePath = path.join(sourceFolder, file);
      const destinationPath = path.join(destinationFolder, file);
      return copyFile(sourcePath, destinationPath);
    });

    await Promise.all(copyPromises);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await copy();
