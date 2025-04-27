import { Transform } from 'stream';

const transform = async () => {
  console.log('Please enter text to reverse. Type ":exit" and press Enter to finish.');

  const reverseStream = new Transform({
    transform(chunk, _, callback) {
      const input = chunk.toString().trim();

      if (input === ':exit') {
        process.stdin.pause();
        return callback();
      }

      const reversed = input.split('').reverse().join('');
      this.push(reversed + '\n');
      callback();
    },
  });

  process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();
