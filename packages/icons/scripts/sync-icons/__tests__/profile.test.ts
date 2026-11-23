import { profile } from '../profile';

describe('profile', () => {
  it.each(['ui/add', 'nav/home', ' ui/add '])('takes the icon name of "%s"', (name) => {
    expect(profile.iconName(name)).toHaveProperty('name');
  });

  it.each(['add', 'ui/', 'icons/add', 'ui/add/extra'])(
    'rejects "%s" and says how to fix it',
    (name) => {
      const parsed = profile.iconName(name);
      expect('problem' in parsed && parsed.problem).toContain('Rename the icon set in Figma');
    },
  );

  it('syncs the sizes 12, 16 and 24 as numbers', () => {
    expect(profile.variants).toEqual({ sizes: ['12', '16', '24'], sizeIsNumber: true });
  });
});
