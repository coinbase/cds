// Mocks all svgEsmMap modules for Jest.
// The real files use: export default { name: { themeable: () => Promise<string> } }
const MOCK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="var(--illustration-primary)" d="M0 0h24v24H0z"/></svg>';

const mapProxy = new Proxy(
  {},
  {
    get(_, name) {
      if (name === '__esModule') return undefined;
      return { themeable: () => Promise.resolve(MOCK_SVG) };
    },
  },
);

module.exports = { default: mapProxy, __esModule: true };
