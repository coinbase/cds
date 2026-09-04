import { isValidURL } from '../isValidURL';

const VALID_URLS = [
  'http://foo.com/blah_blah',
  'http://foo.com/blah_blah/',
  'http://foo.com/blah_blah_(wikipedia)',
  'http://foo.com/blah_blah_(wikipedia)_(again)',
  'http://www.example.com/wpstyle/?p=364',
  'https://www.example.com/foo/?bar=baz&inga=42&quux',
  'http://✪df.ws/123',
  'http://userid:password@example.com:8080',
  'http://userid:password@example.com:8080/',
  'http://userid@example.com',
  'http://userid@example.com/',
  'http://userid@example.com:8080',
  'http://userid@example.com:8080/',
  'http://userid:password@example.com',
  'http://userid:password@example.com/',
  'http://➡.ws/䨹',
  'http://⌘.ws',
  'http://⌘.ws/',
  'http://foo.com/blah_(wikipedia)#cite-1',
  'http://foo.com/blah_(wikipedia)_blah#cite-1',
  'http://foo.com/unicode_(✪)_in_parens',
  'http://foo.com/(something)?after=parens',
  'http://☺.damowmow.com/',
  'http://code.google.com/events/#&product=browser',
  'http://j.mp',
  'http://foo.bar/?q=Test%20URL-encoded%20stuff',
  'http://مثال.إختبار',
  'http://例子.测试',
  "http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com",
  'http://1337.net',
  'http://a.b-c.de',
  'http://223.255.255.254',
  'http://coinbase.com',
  'https://coinbase.com',
  'https://yearn.finance',
  'https://docs.enzyme.finance',
  'https://compound.finance',
  'https://clover.finance',
  'https://app.badger.finance',
  'https://app.cream.finance',
  'https://coinbase.com/earn/something',
];

const INVALID_URLS = [
  'something',
  '/earn/something',
  'coinbase.com',
  'https://yearn.abcdefghijklmnopqrstuvxyabcdefghijklmnopqrstuvidkdksidkwkewerjkwejrkwekrwejrkwejrwekrkwerwekjrwkerjwkerjk',
  'http://coinbase',
  'http://',
  'http://.',
  'http://..',
  'http://../',
  'http://?',
  'http://??',
  'http://??/',
  'http://#',
  'http://##',
  'http://##/',
  'http://foo.bar?q=Spaces should be encoded',
  '//',
  '//a',
  '///a',
  '///',
  'http:///a',
  'rdar://1234',
  'h://test',
  'http:// shouldfail.com',
  ':// should fail',
  'http://foo.bar/foo(bar)baz quux',
  'ftps://foo.bar/',
  'http://-error-.invalid/',
  'http://-a.b.co',
  'http://a.b-.co',
  'http://0.0.0.0',
  'http://3628126748',
  'http://.www.foo.bar/',
  'http://www.foo.bar./',
  'http://.www.foo.bar./',
];

describe('isValidURL', () => {
  VALID_URLS.map((url) => {
    return it(`returns true valid ${url}`, () => {
      expect(isValidURL(url)).toBe(true);
    });
  });

  INVALID_URLS.map((url) => {
    return it(`returns false on invalid ${url}`, () => {
      expect(isValidURL(url)).toBe(false);
    });
  });
});
