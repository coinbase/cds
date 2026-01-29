/**
 * Mock for react-test-renderer to work around React 19 deprecation.
 *
 * react-native-accessibility-engine depends on react-test-renderer and accesses
 * `.root` on a created instance at import time. In React 19, react-test-renderer
 * is deprecated and this causes import failures.
 *
 * This mock provides the minimal API needed for react-native-accessibility-engine
 * to initialize, while delegating actual test rendering to @testing-library/react-native.
 *
 * See: https://react.dev/warnings/react-test-renderer
 */

// Create a mock prototype that will be used by isReactTestInstance
const mockTestInstancePrototype = {};

// Create a mock root object
const createMockRoot = () => {
  const mockInstance = Object.create(mockTestInstancePrototype);
  mockInstance.type = 'div';
  mockInstance.props = {};
  mockInstance.children = [];
  mockInstance.parent = null;
  mockInstance.find = () => null;
  mockInstance.findAll = () => [];
  mockInstance.findByType = () => null;
  mockInstance.findAllByType = () => [];
  mockInstance.findByProps = () => null;
  mockInstance.findAllByProps = () => [];
  mockInstance.instance = null;
  return mockInstance;
};

// Mock the create function
const create = () => {
  return {
    root: createMockRoot(),
    toJSON: () => null,
    toTree: () => null,
    update: () => {},
    unmount: () => {},
    getInstance: () => null,
  };
};

// Mock act function
const act = (callback) => {
  if (typeof callback === 'function') {
    const result = callback();
    if (result && typeof result.then === 'function') {
      return result;
    }
  }
  return Promise.resolve();
};

module.exports = {
  create,
  act,
};
