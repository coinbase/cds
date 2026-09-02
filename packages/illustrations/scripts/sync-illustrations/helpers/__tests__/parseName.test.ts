import { parseName } from '../parseName';

describe('parseName', () => {
  it('should parse the type and name from the node name', () => {
    const node = {
      document: {
        name: 'ui/closeIcon',
      },
    };

    const expected = {
      type: 'ui',
      name: 'closeIcon',
    };

    const result = parseName(node);

    expect(result).toEqual(expected);
  });

  it('should throw an error if the node name is not in the correct format', () => {
    const node = {
      document: {
        name: 'closeIcon',
      },
    };

    expect(() => parseName(node)).toThrow(
      'closeIcon is not in [type]/[name] format. Update the Figma file to use this format.',
    );
  });

  it('should throw an error if the asset name is not in camelCase', () => {
    const node = {
      document: {
        name: 'ui/CloseIcon',
      },
    };

    expect(() => parseName(node)).toThrow(
      'Name is not in camelCase: CloseIcon. Update the Figma file with a new camelCase name for ui/CloseIcon.',
    );
  });

  it('should not throw an error if the asset name has a leading number but otherwise is in camelCase', () => {
    const node = {
      document: {
        name: 'ui/2faIcon',
      },
    };

    const expected = {
      type: 'ui',
      name: '2faIcon',
    };

    const result = parseName(node);

    expect(result).toEqual(expected);
  });
});
