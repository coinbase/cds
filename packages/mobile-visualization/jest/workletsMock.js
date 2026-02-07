/**
 * Mock for react-native-worklets 0.5.2
 * The built-in mock at lib/module/mock is not available until later versions: 0.7.X,
 * Following CMR's version recomendataion on versions we are staying with 0.5.2 and reanimated 4.1.1 for now
 */

const NOOP = () => {};
const NOOP_FACTORY = () => NOOP;
const IDENTITY = (v) => v;

module.exports = {
  // deprecated.js exports
  isShareableRef: () => false,
  makeShareable: IDENTITY,
  makeShareableCloneOnUIRecursive: IDENTITY,
  makeShareableCloneRecursive: IDENTITY,
  shareableMappingCache: {
    set: NOOP,
    get: () => undefined,
  },

  // featureFlags exports
  getStaticFeatureFlag: () => false,
  setDynamicFeatureFlag: NOOP,

  // isSynchronizable.js exports
  isSynchronizable: () => false,

  // runtimeKind.js exports
  getRuntimeKind: () => 'RN',
  RuntimeKind: {
    RN: 'RN',
    UI: 'UI',
    Worklet: 'Worklet',
  },

  // runtimes.js exports
  createWorkletRuntime: () => ({}),
  runOnRuntime: NOOP_FACTORY,

  // serializable.js exports
  createSerializable: IDENTITY,
  isSerializableRef: () => false,

  // serializableMappingCache.js exports
  serializableMappingCache: {
    set: NOOP,
    get: () => undefined,
  },

  // synchronizable.js exports
  createSynchronizable: IDENTITY,

  // threads.js exports
  callMicrotasks: NOOP,
  executeOnUIRuntimeSync: IDENTITY,
  runOnJS: IDENTITY,
  runOnUI: NOOP_FACTORY,
  runOnUIAsync: () => Promise.resolve(),
  runOnUISync: IDENTITY,
  scheduleOnRN: NOOP,
  scheduleOnUI: NOOP,
  unstable_eventLoopTask: NOOP,

  // workletFunction.js exports
  isWorkletFunction: () => false,

  // WorkletsModule exports
  WorkletsModule: {
    createWorkletRuntime: () => ({}),
  },
};
