/// <reference types="detox" />

/* eslint-disable no-restricted-syntax */

declare module 'process' {
  global {
    export const testFailed: boolean;
    namespace NodeJS {
      interface ProcessEnv {
        readonly APP_DEBUG?: `${0 | 1}`;
        readonly APP_JS_ENGINE?: 'jsc' | 'hermes';
        readonly APP_PLATFORM: 'ios' | 'android';
        readonly APP_NAME?: string;
        readonly APP_NEW_ARCH_ENABLED?: `${0 | 1}`;
        readonly APP_PROFILE?: 'debug' | 'release';
      }
    }
  }
}
