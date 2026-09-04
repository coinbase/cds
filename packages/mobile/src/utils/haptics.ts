import { NativeModules } from 'react-native';

const noop = (...args: any[]) => {};

const HapticsModule = (NativeModules.Haptics || {
  impactAsync: noop,
  notificationAsync: noop,
}) as {
  impactAsync: (type: string) => Promise<void>;
  notificationAsync: (type: string) => Promise<void>;
};

const notification = async (type: 'success' | 'warning' | 'error'): Promise<void> =>
  HapticsModule.notificationAsync(type);

const successNotification = async () => notification('success');

const warningNotification = async () => notification('warning');

const errorNotification = async () => notification('error');

const impact = async (style: 'light' | 'medium' | 'heavy'): Promise<void> =>
  HapticsModule.impactAsync(style);

const lightImpact = async () => impact('light');

const normalImpact = async () => impact('medium');

const heavyImpact = async () => impact('heavy');

export const Haptics = {
  successNotification,
  warningNotification,
  errorNotification,
  lightImpact,
  normalImpact,
  heavyImpact,
};
