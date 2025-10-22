import type { LoadContext, Plugin } from '@docusaurus/types';
import type { Request, Response } from 'express';
import path from 'path';
import type WebpackDevServer from 'webpack-dev-server';
import type { Middleware } from 'webpack-dev-server';

const PLUGIN_ID = '@coinbase/docusaurus-plugin-llm-dev-server';

type PluginOptions = {
  generatorPath?: string;
};

type Platform = 'web' | 'mobile';
type DocType = 'components' | 'hooks' | 'getting-started';

export default function plugin(context: LoadContext, options: PluginOptions = {}): Plugin<void> {
  const { siteDir } = context;
  const generatorPath = options.generatorPath || path.join(siteDir, 'ai-doc-generator');

  return {
    name: PLUGIN_ID,

    configureWebpack() {
      if (process.env.NODE_ENV !== 'development') {
        return {};
      }

      return {
        devServer: {
          setupMiddlewares: (middlewares: Middleware[], devServer?: WebpackDevServer) => {
            if (!devServer || !devServer.app) {
              return middlewares;
            }

            // Add middleware to handle /llms/:platform/routes.txt
            devServer.app.get(
              '/llms/:platform/routes.txt',
              async (req: Request<{ platform: Platform }>, res: Response) => {
                try {
                  const { platform } = req.params;

                  // Validate platform
                  if (!['web', 'mobile'].includes(platform)) {
                    return res.status(404).send('Platform not found');
                  }

                  const { generateRoutesContent } = require(
                    path.join(generatorPath, 'generateRoutesContent.cjs'),
                  );
                  const content = await generateRoutesContent(platform, siteDir);

                  if (!content) {
                    return res.status(404).send('Routes not found');
                  }

                  res.type('text/plain');
                  res.send(content);
                } catch (error) {
                  console.error('Error generating routes:', error);
                  res.status(500).send('Error generating routes');
                }
              },
            );

            // Add middleware to handle /llms/* requests
            devServer.app.get(
              '/llms/:platform/:docType/:docName',
              async (
                req: Request<{
                  platform: Platform;
                  docType: DocType;
                  docName: string;
                }>,
                res: Response,
              ) => {
                try {
                  const { platform, docType, docName } = req.params;

                  // Validate inputs
                  if (!['web', 'mobile'].includes(platform)) {
                    return res.status(404).send('Platform not found');
                  }

                  if (!['components', 'hooks', 'getting-started'].includes(docType)) {
                    return res.status(404).send('Doc type not found');
                  }

                  const { resolveDoc } = require(path.join(generatorPath, 'resolveDoc.cjs'));
                  const content = await resolveDoc(
                    platform,
                    docType,
                    docName.replace(/\.txt$/, ''),
                    siteDir,
                  );

                  if (!content) {
                    return res.status(404).send('Doc not found');
                  }

                  res.type('text/plain');
                  res.send(content);
                } catch (error) {
                  console.error('Error generating LLM doc:', error);
                  res.status(500).send('Error generating documentation');
                }
              },
            );

            return middlewares;
          },
        },
      };
    },
  };
}
