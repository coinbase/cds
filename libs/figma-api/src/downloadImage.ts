import https from 'node:https';

export async function downloadImage(url: string): Promise<Buffer> {
  const data: Uint8Array[] = [];

  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      res
        .on('data', (chunk: Uint8Array) => {
          data.push(chunk);
        })
        .on('end', () => {
          const imageBuffer = Buffer.concat(data);
          resolve(imageBuffer);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
    req.end();
  });
}
