import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import type axe from 'axe-core';
import { axe as runAxe, toHaveNoViolations } from 'jest-axe';

if (typeof expect !== 'undefined') {
  expect.extend(toHaveNoViolations);
}

export async function renderA11y(
  element: React.ReactElement,
  {
    beforeRender,
    afterRender,
    ...options
  }: axe.RunOptions & {
    beforeRender?: () => Promise<unknown>;
    afterRender?: (result: RenderResult) => Promise<unknown>;
  } = {},
): Promise<axe.AxeResults> {
  if (beforeRender) {
    await beforeRender();
  }

  const view = render(element);

  if (afterRender) {
    await afterRender(view);
  }

  // @ts-expect-error mismatched types
  const results = await runAxe(view.container, options);

  // @types/jest-axe uses v3 axe types, while axe-core/jest-axe is v4.
  return results as any;
}
