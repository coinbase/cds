/* -------------------------------------------------------------------------- */
/*                             @floating-ui/react-dom                         */
/* -------------------------------------------------------------------------- */
jest.mock('@floating-ui/react-dom', () => {
  const floatingRef = { current: null };
  return {
    useFloating: () => ({
      refs: {
        setReference: jest.fn(),
        setFloating: jest.fn((el) => {
          floatingRef.current = el;
        }),
        reference: { current: null },
        floating: floatingRef,
      },
      floatingStyles: {},
      placement: 'bottom',
      middlewareData: { arrow: {} },
    }),
    // Middleware stubs — these are called as functions and must return a value
    arrow: () => ({}),
    autoPlacement: () => ({}),
    autoUpdate: jest.fn(),
    flip: () => ({}),
    limitShift: () => ({}),
    offset: () => ({}),
    shift: () => ({}),
  };
});

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  m: jest.requireActual('framer-motion')?.motion,
  useReducedMotion: () => true,
  LazyMotion: ({ children = null }) => children,
  AnimatePresence: ({ children = null }) => children,
  MotionConfig: ({ children = null }) => children,
  MotionGlobalConfig: { skipAnimations: true },
}));

/* -------------------------------------------------------------------------- */
/*                                 matchMedia                                 */
/* -------------------------------------------------------------------------- */
// grab the min width value
const queryMinWidth = (query) => {
  const q = query.split(' ');
  if (q.length < 2) return false;

  return parseInt(q[1].split('px')[0]);
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => {
    return {
      matches: query ? window.innerWidth >= queryMinWidth(query) : false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  }),
});

/* -------------------------------------------------------------------------- */
/*                              getComputedStyle                              */
/* -------------------------------------------------------------------------- */
const { getComputedStyle } = global.window;

window.getComputedStyle = (eletm, select) => getComputedStyle(eletm, select);
