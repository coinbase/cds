/* We provide a base64 encoded image instead of uploading and importing a jpg in code for 2 reasons:
 * 1. You can place it in common code and anything can import it regardless of its build process
 * 2. You don't need to turn on image exports in bazel which can possibly export more images than the remote fallback.
 * 3. Use can use these as tokens if you wish to use them outside of RemoteImage
 * */

/**
 * These are svgs encoded base64 so they can scale for any size Remote Images
 * */
export const remoteImageDarkFallbackSrc =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IiM4QTkxOUUiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNSIgcj0iMyIgZmlsbD0iIzBBMEIwRCIvPgo8cmVjdCB4PSIxMSIgeT0iNiIgd2lkdGg9IjUiIGhlaWdodD0iNSIgZmlsbD0iIzBBMEIwRCIvPgo8cGF0aCBkPSJNNSAxNUw4LjUgOUwxMiAxNUg1WiIgZmlsbD0iIzBBMEIwRCIvPgo8L3N2Zz4K';

export const remoteImageLightFallbackSrc =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IiM1QjYxNkUiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNSIgcj0iMyIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTEiIHk9IjYiIHdpZHRoPSI1IiBoZWlnaHQ9IjUiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik01IDE1TDguNSA5TDEyIDE1SDVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
