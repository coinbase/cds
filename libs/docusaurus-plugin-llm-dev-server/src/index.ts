import type { LoadContext, Plugin } from '@docusaurus/types';
import path from 'path';

const PLUGIN_ID = '@coinbase/docusaurus-plugin-llm-dev-server';

type PluginOptions = {
  generatorPath?: string;
};

export default function plugin(context: LoadContext, options: PluginOptions = {}): Plugin<void> {
  const { siteDir } = context;
  const generatorPath = options.generatorPath || path.join(siteDir, 'ai-doc-generator');

  return {
    name: PLUGIN_ID,

    configureWebpack(config) {
      // Only add middleware in dev mode
      if (process.env.NODE_ENV !== 'production') {
        return {
          devServer: {
            setupMiddlewares: (middlewares: any, devServer: any) => {
              if (!devServer || !devServer.app) {
                return middlewares;
              }

              // Add middleware to handle /llms/:platform/routes.txt
              devServer.app.get('/llms/:platform/routes.txt', async (req: any, res: any) => {
                try {
                  const { platform } = req.params;

                  // Validate platform
                  if (!['web', 'mobile'].includes(platform)) {
                    return res.status(404).send('Invalid platform');
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
              });

              // Add middleware to handle /llms/* requests
              devServer.app.get('/llms/:platform/:docType/:docName', async (req: any, res: any) => {
                try {
                  const { platform, docType, docName } = req.params;

                  // Validate inputs
                  if (!['web', 'mobile'].includes(platform)) {
                    return res.status(404).send('Invalid platform');
                  }

                  if (!['components', 'hooks', 'getting-started'].includes(docType)) {
                    return res.status(404).send('Invalid doc type');
                  }

                  const { resolveDoc } = require(path.join(generatorPath, 'resolveDoc.cjs'));
                  const content = await resolveDoc(
                    platform,
                    docType,
                    docName.replace(/\.txt$/, ''),
                    siteDir,
                  );

                  if (!content) {
                    return res.status(404).send('Documentation not found');
                  }

                  res.type('text/plain');
                  res.send(content);
                } catch (error) {
                  console.error('Error generating LLM doc:', error);
                  res.status(500).send('Error generating documentation');
                }
              });

              return middlewares;
            },
          },
        } as any;
      }

      return {};
    },
  };
}
