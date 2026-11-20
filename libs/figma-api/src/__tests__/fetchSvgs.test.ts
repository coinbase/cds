import { downloadSvgImage } from '../downloadSvgImage';
import { fetchSvgs } from '../fetchSvgs';
import { getFileImages } from '../getFileImages';

jest.mock('../getFileImages');
jest.mock('../downloadSvgImage');

const getImages = getFileImages as jest.MockedFunction<typeof getFileImages>;
const download = downloadSvgImage as jest.MockedFunction<typeof downloadSvgImage>;

const exportsFor = (ids: string[]) =>
  ({ images: Object.fromEntries(ids.map((id) => [id, `https://cdn/${id}.svg`])) }) as Awaited<
    ReturnType<typeof getFileImages>
  >;

beforeEach(() => {
  jest.resetAllMocks();
  download.mockImplementation(async (url) => `<svg data-url="${url}"/>`);
});

describe('fetchSvgs', () => {
  it('downloads the SVG of every node and returns them by node id', async () => {
    getImages.mockResolvedValueOnce(exportsFor(['1:1', '2:2']));
    const svgs = await fetchSvgs('FILE', ['1:1', '2:2']);
    expect(svgs.get('1:1')).toBe('<svg data-url="https://cdn/1:1.svg"/>');
    expect([...svgs.keys()]).toEqual(['1:1', '2:2']);
    expect(getImages).toHaveBeenCalledWith('FILE', { ids: '1:1,2:2', format: 'svg' });
  });

  it('asks for at most 500 nodes per export request', async () => {
    const ids = Array.from({ length: 501 }, (_, index) => `1:${index}`);
    getImages.mockImplementation(async (_file, params) =>
      exportsFor(String(params?.ids).split(',')),
    );
    await fetchSvgs('FILE', ids);
    expect(getImages).toHaveBeenCalledTimes(2);
  });

  it('reports progress after each download', async () => {
    getImages.mockResolvedValueOnce(exportsFor(['1:1', '2:2']));
    const onProgress = jest.fn();
    await fetchSvgs('FILE', ['1:1', '2:2'], onProgress);
    expect(onProgress.mock.calls).toEqual([
      [1, 2],
      [2, 2],
    ]);
  });

  it('fails when Figma returns no export for a node', async () => {
    getImages.mockResolvedValueOnce({ images: { '1:1': null } } as unknown as Awaited<
      ReturnType<typeof getFileImages>
    >);
    await expect(fetchSvgs('FILE', ['1:1'])).rejects.toThrow(
      'Figma did not return an SVG export for node 1:1',
    );
  });
});
