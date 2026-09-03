import crypto from 'node:crypto';

export function createHashFromObject(obj: Record<string, unknown>) {
  const stringifiedObj = JSON.stringify(obj);

  return crypto.createHash('sha256').update(stringifiedObj).digest('base64');
}
