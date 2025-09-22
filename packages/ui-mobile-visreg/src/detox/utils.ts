/// <reference types="detox" />

/**
 * Inline implementations of detox utilities to replace @cbhq/detox-utils dependency
 */

/**
 * Wait for a screen element to appear (visible)
 */
export async function screenShouldAppear(elementId: string): Promise<void> {
  await expect(element(by.id(elementId))).toBeVisible();
}

/**
 * Check that a screen element exists (doesn't need to be visible)
 */
export async function screenShouldExist(elementId: string): Promise<void> {
  // @ts-expect-error toExist() does not exist in jest-dom Matchers
  await expect(element(by.id(elementId))).toExist();
}

/**
 * Find an element by its ID
 */
export function findElementById(elementId: string): Detox.IndexableNativeElement {
  return element(by.id(elementId));
}

/**
 * Sleep for the specified number of milliseconds
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
