import { getTransform } from '../dotStyles';

describe('getTransform', () => {
  it('returns correct style object', () => {
    const pinStyles = getTransform(-12, -12);

    expect(pinStyles).toEqual({
      position: 'absolute',
      transform: [
        {
          translateX: -12,
        },
        {
          translateY: -12,
        },
      ],
    });
  });
});
