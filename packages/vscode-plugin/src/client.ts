import path from 'node:path';
import { type ExtensionContext, workspace } from 'vscode';
import type { LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;

// Update this if you're going to pass custom data to the server's connection.onInitialize handler
export type CustomInitializationOptions = Record<string, never>;

export function activate(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath(path.join('dist', 'server.js'));
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  // Use this to pass custom data to the server's connection.onInitialize handler, such as user preferences
  const initializationOptions: CustomInitializationOptions = {};

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    initializationOptions,
    documentSelector: [
      { scheme: 'file', language: 'typescript' },
      { scheme: 'file', language: 'typescriptreact' },
      { scheme: 'file', language: 'javascript' },
      { scheme: 'file', language: 'javascriptreact' },
      { scheme: 'file', language: 'css' },
      { scheme: 'file', language: 'scss' },
    ],
    synchronize: {
      // Notify the server about file changes to '.clientrc' files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/.clientrc'),
    },
  };

  client = new LanguageClient('cdsVSCodePlugin', 'CDS VSCode Plugin', serverOptions, clientOptions);
  // Start the client. This will also launch the server
  void client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) return undefined;
  return client.stop();
}
