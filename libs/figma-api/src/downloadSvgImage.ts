import https from 'node:https';

export async function downloadSvgImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let imagedata = '';
        response.setEncoding('utf-8');
        response.on('data', (chunk) => {
          imagedata += chunk;
        });
        response.on('end', () => {
          resolve(imagedata);
        });
      })
      .on('error', (err) => reject(err));
  });
}
