import type { CellPriority } from '../../types/CellBaseProps';
import { hasCellPriority } from '../cell';

const testString: CellPriority = 'start';
const testArr: CellPriority[] = ['start', 'end'];

const priorityToMatch: CellPriority = 'start';
const priorityToNotMatch: CellPriority = 'middle';

describe('hasCellPriority', () => {
  it('matches a string', () => {
    expect(hasCellPriority(priorityToMatch, testString)).toBe(true);
  });
  it('matches an array', () => {
    expect(hasCellPriority(priorityToMatch, testArr)).toBe(true);
  });
  it('returns false when it does not match a string', () => {
    expect(hasCellPriority(priorityToNotMatch, testString)).toBe(false);
  });
  it('returns false when it does not match an array', () => {
    expect(hasCellPriority(priorityToNotMatch, testArr)).toBe(false);
  });
});
