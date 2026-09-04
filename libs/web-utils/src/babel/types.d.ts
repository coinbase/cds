declare module '@linaria/babel-preset' {
  import type { ConfigAPI, TransformOptions } from '@babel/core';

  export type StrictOptions = {
    classNameSlug?: string | ClassNameFn;
    displayName: boolean;
    evaluate: boolean;
    ignore?: RegExp;
    babelOptions: TransformOptions;
    rules: EvalRule[];
  };

  export type PluginOptions = Partial<StrictOptions> & {
    configFile?: string;
  };

  export default function preset(babel: ConfigAPI, options: PluginOptions): TransformOptions;
}
