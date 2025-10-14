# Docusaurus Plugin LLM Dev Server

A Docusaurus plugin that serves LLM-friendly documentation on-the-fly during development.

## Features

- **On-the-fly generation**: Generates LLM docs dynamically during dev mode
- **Always up-to-date**: No need to regenerate when MDX files change
- **No static files**: Keeps the `static/` directory clean in dev mode
- **Production ready**: Falls back to static `dist/llms` files in production

## How It Works

In development mode, this plugin adds Express middleware that intercepts requests to:

- `/llms/:platform/:docType/:docName.txt` - Individual doc pages
- `/llms/:platform/routes.txt` - Routes index for all docs

The documentation content is generated on-demand using the existing AI doc generator logic.

In production, these requests are handled by static files in `dist/llms/` generated during the build process.

## Usage

Add the plugin to your `docusaurus.config.ts`:

```typescript
import llmDevServerPlugin from '@coinbase/docusaurus-plugin-llm-dev-server';

export default {
  plugins: [
    [
      llmDevServerPlugin,
      {
        generatorPath: path.join(__dirname, 'ai-doc-generator'),
      },
    ],
  ],
};
```

## Options

- `generatorPath` (optional): Path to the AI doc generator directory. Defaults to `{siteDir}/ai-doc-generator`.
