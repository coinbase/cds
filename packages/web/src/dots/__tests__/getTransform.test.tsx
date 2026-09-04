import { getTransform } from '../dotStyles';

describe('getTransform', () => {
  it('returns correct transform for pin = bottom-start', () => {
    const pinStyles = getTransform('bottom-start');

    expect(pinStyles).toStrictEqual({
      position: 'absolute',
      bottom: 0,
      left: 0,
      transform: 'translate(-50%, 50%)',
      translateX: '-50%',
      translateY: '50%',
    });
  });

  it('returns correct transform for pin = bottom-end', () => {
    const pinStyles = getTransform('bottom-end');

    expect(pinStyles).toStrictEqual({
      position: 'absolute',
      bottom: 0,
      right: 0,
      transform: 'translate(50%, 50%)',
      translateX: '50%',
      translateY: '50%',
    });
  });

  it('returns correct transform for pin = top-start', () => {
    const pinStyles = getTransform('top-start');

    expect(pinStyles).toStrictEqual({
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'translate(-50%, -50%)',
      translateX: '-50%',
      translateY: '-50%',
    });
  });

  it('returns correct transform for pin = top-end', () => {
    const pinStyles = getTransform('top-end');

    expect(pinStyles).toStrictEqual({
      position: 'absolute',
      top: 0,
      right: 0,
      transform: 'translate(50%, -50%)',
      translateX: '50%',
      translateY: '-50%',
    });
  });
});
