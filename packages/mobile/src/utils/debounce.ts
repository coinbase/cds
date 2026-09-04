import _debounce from 'lodash/debounce';

// React Native is historically trash at debouncing touch events
// This can cause a lot of unwanted behavior (in UMO - mostly double navigations
// where we push a screen/experience onto the stack 2 times). Debouncing the event
// 500 miliseconds, but taking the leading event prevents this effect and the accidental "double-tap"
// https://medium.com/@devmrin/debouncing-touch-events-in-react-native-prevent-navigating-twice-or-more-times-when-button-is-90687e4a8113
export const debounce = (fn: ReturnType<Parameters<typeof _debounce>[0]>, time = 500) => {
  return _debounce(fn, time, { leading: true, trailing: false });
};
