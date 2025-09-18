import { handlePreventPropagation } from '../eventHandlers';

describe('eventHandlers.test', () => {
  it('triggers stop propagation', () => {
    const mockEvent = {
      stopPropagation: jest.fn(),
    };

    handlePreventPropagation(mockEvent as unknown as React.MouseEvent<HTMLDivElement>);
    expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
  });
});
