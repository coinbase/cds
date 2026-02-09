/**
 * Mock for react-native-worklets 0.5.2
 * The built-in mock at lib/module/mock is not available until later versions: 0.7.X,
 * Following CMR's version recommendation on versions we are staying with 0.5.2 and reanimated 4.1.1 for now
 * This mock is based on the official mock from:
 * https://github.com/software-mansion/react-native-reanimated/blob/main/packages/react-native-worklets/src/mock.ts
 */

'use strict';

const NOOP = () => {};
const NOOP_FACTORY = () => NOOP;
const IDENTITY = (value) => value;
const IMMEDIATE_CALLBACK_INVOCATION = (callback) => callback();

const RuntimeKind = {
  ReactNative: 'RN',
  UI: 'UI',
  Worklet: 'Worklet',
};

// Mocked requestAnimationFrame that uses setTimeout and passes timestamp
// This fixes Jest's React Native setup which doesn't pass timestamps to callbacks
// See: https://github.com/facebook/react-native/blob/main/packages/react-native/jest/setup.js#L28
const mockedRequestAnimationFrame = (callback) => {
  return setTimeout(() => callback(performance.now()), 0);
};

// Set up global properties that reanimated expects from the native runtime
global._WORKLET = false;
global.__RUNTIME_KIND = RuntimeKind.ReactNative;
global._log = console.log;
global._getAnimationTimestamp = () => performance.now();
global.__flushAnimationFrame = NOOP;
global.requestAnimationFrame = mockedRequestAnimationFrame;

const WorkletAPI = {
  isShareableRef: () => true,
  makeShareable: IDENTITY,
  makeShareableCloneOnUIRecursive: IDENTITY,
  makeShareableCloneRecursive: IDENTITY,
  shareableMappingCache: new Map(),

  getStaticFeatureFlag: () => false,
  setDynamicFeatureFlag: NOOP,

  isSynchronizable: () => false,

  getRuntimeKind: () => RuntimeKind.ReactNative,
  RuntimeKind,

  createWorkletRuntime: NOOP_FACTORY,
  runOnRuntime: IDENTITY,
  runOnRuntimeAsync(workletRuntime, worklet, ...args) {
    return WorkletAPI.runOnUIAsync(worklet, ...args);
  },
  scheduleOnRuntime: IMMEDIATE_CALLBACK_INVOCATION,

  createSerializable: IDENTITY,
  isSerializableRef: IDENTITY,
  serializableMappingCache: new Map(),

  createSynchronizable: IDENTITY,

  callMicrotasks: NOOP,
  executeOnUIRuntimeSync: IDENTITY,

  runOnJS(fun) {
    return (...args) => queueMicrotask(args.length ? () => fun(...args) : fun);
  },

  runOnUI(worklet) {
    return (...args) => {
      // In Jest environment we schedule work via mockedRequestAnimationFrame
      // to ensure it runs when timers are advanced
      mockedRequestAnimationFrame(() => {
        worklet(...args);
      });
    };
  },

  runOnUIAsync(worklet, ...args) {
    return new Promise((resolve) => {
      mockedRequestAnimationFrame(() => {
        const result = worklet(...args);
        resolve(result);
      });
    });
  },

  runOnUISync: IMMEDIATE_CALLBACK_INVOCATION,

  scheduleOnRN(fun, ...args) {
    WorkletAPI.runOnJS(fun)(...args);
  },

  scheduleOnUI(worklet, ...args) {
    WorkletAPI.runOnUI(worklet)(...args);
  },

  unstable_eventLoopTask: NOOP_FACTORY,

  isWorkletFunction: () => false,

  WorkletsModule: {},
};

module.exports = {
  __esModule: true,
  ...WorkletAPI,
};
