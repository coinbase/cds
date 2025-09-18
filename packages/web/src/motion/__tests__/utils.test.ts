import type { MotionConfigs } from '../types';
import { convertMotionConfigs, convertTransition, createVariant } from '../utils';

describe('convertTransitions', () => {
  it('converts CDS tokens to values', () => {
    expect(
      convertTransition({
        easing: 'global',
        duration: 'moderate3',
      }),
    ).toEqual({
      ease: [0.6, 0, 0.15, 1],
      duration: 0,
      delay: 0,
    });
  });

  it('converts delays', () => {
    expect(
      convertTransition({
        easing: 'enterFunctional',
        duration: 'slow2',
        delay: 1500,
      }),
    ).toEqual({
      ease: [0, 0, 0.15, 1],
      duration: 0,
      delay: 0,
    });
  });

  it('works with spring', () => {
    const mockConfig = {
      type: 'spring',
      damping: 300,
      delay: 0,
      duration: 0,
      ease: undefined,
      stiffness: 50,
    };
    expect(convertTransition(mockConfig as any)).toEqual(mockConfig);
  });
});

describe('convertMotionConfigs', () => {
  it('converts multiple motion configs', () => {
    const mockConfigs: MotionConfigs = [
      { property: 'opacity', easing: 'enterFunctional', duration: 'fast1', toValue: 1 },
      {
        property: 'scale',
        easing: 'enterFunctional',
        duration: 'moderate3',
        toValue: 1,
      },
    ];

    const expected = {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: {
          ease: [0, 0, 0.15, 1],
          duration: 0,
          delay: 0,
        },
        scale: {
          ease: [0, 0, 0.15, 1],
          duration: 0,
          delay: 0,
        },
      },
    };

    expect(convertMotionConfigs(mockConfigs)).toEqual(expected);
  });

  it('converts single motion configs', () => {
    const mockConfigs: MotionConfigs = [
      { property: 'rotate', easing: 'global', duration: 'slow1', toValue: 180 },
    ];

    const expected = {
      rotate: 180,
      transition: {
        rotate: {
          ease: [0.6, 0, 0.15, 1],
          duration: 0,
          delay: 0,
        },
      },
    };

    expect(convertMotionConfigs(mockConfigs)).toEqual(expected);
  });
});

describe('createVariant', () => {
  it('creates variant with configs array', () => {
    const mockConfigs: MotionConfigs = [
      { property: 'opacity', easing: 'enterFunctional', duration: 'fast1', toValue: 1 },
      {
        property: 'scale',
        easing: 'enterFunctional',
        duration: 'moderate3',
        toValue: 1,
      },
    ];

    const expected = {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: {
          ease: [0, 0, 0.15, 1],
          duration: 0,
          delay: 0,
        },
        scale: {
          ease: [0, 0, 0.15, 1],
          duration: 0,
          delay: 0,
        },
      },
    };

    expect(createVariant(mockConfigs)).toEqual(expected);
  });

  it('creates variant with object', () => {
    const mockConfigs: MotionConfigs = {
      tokens: [
        { property: 'opacity', easing: 'enterFunctional', duration: 'fast1', toValue: 1 },
        {
          property: 'scale',
          easing: 'enterFunctional',
          duration: 'moderate3',
          toValue: 1,
        },
      ],
      transitionEnd: { display: 'none' },
    };

    const expected = {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: {
          ease: [0, 0, 0.15, 1],
          duration: 0,
          delay: 0,
        },
        scale: {
          ease: [0, 0, 0.15, 1],
          duration: 0,
          delay: 0,
        },
      },
      transitionEnd: { display: 'none' },
    };

    expect(createVariant(mockConfigs)).toEqual(expected);
  });
});
