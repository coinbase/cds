import type {
  CompletionItem,
  CompletionParams,
  InitializeParams,
  InitializeResult,
} from 'vscode-languageserver/node';
import {
  CompletionItemKind,
  createConnection,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

import {
  type StyleVarType,
  type Theme,
  type VarType,
  styleVarPrefixes,
} from './cds-next/core/theme';
import { lightTheme } from './cds-next/themes/light';
import type { CustomInitializationOptions } from './client';

/** The theme being used for autocompletion */
const theme = lightTheme;

const varNames = new Set(Object.values(theme).flatMap((varValues) => Object.keys(varValues)));
/** Checks if a string is a varName, e.g. `blue10` from `spectrum`, `textForeground` from `color`, etc.` */
const isVarName = (name: string): name is keyof Theme => varNames.has(name);

const createCSSVarName = (varType: VarType, varName: string): string =>
  `--${
    varType in styleVarPrefixes ? `${styleVarPrefixes[varType as StyleVarType]}-` : ''
  }${varName}`;

/** Gets the text that is inserted upon confirming autocompletion */
const createVarInsertText = (varType: VarType, cssVarName: string): string => {
  switch (varType) {
    case 'spectrum':
      return `var(rgb(${cssVarName}))`;
    default:
      return `var(${cssVarName})`;
  }
};

/** Gets the human-readable details about this var value */
const createVarDetail = (varType: VarType, varValue: string): CompletionItem['detail'] => {
  switch (varType) {
    case 'spectrum': {
      const [r, g, b] = varValue.split(',');
      return `rgb(${r}, ${g}, ${b})`;
    }
    case 'color': {
      // TO DO: We should include BOTH the spectrum name value `--blue20` AND the converted value
      // Replaces `var(rgba(--blue20,0.2))` with `rgba(115, 162, 255, 0.2)`
      if (!varValue.includes('var(') || !varValue.startsWith('rgb')) return varValue;
      const colorText = varValue.match(/rgba?\((.*)\)/)?.[1];
      if (!colorText) throw new Error(`Invalid color value: ${varValue}`);
      const [cssVarText, alpha] = colorText.split(',');
      const spectrumName = cssVarText.replace('var(--', '').replace(')', '');
      const colorValue = lightTheme.spectrum[spectrumName as keyof Theme['spectrum']];
      const [r, g, b] = colorValue.split(',');
      return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
    }
    default:
      return varValue;
  }
};

type VarCompletionData = {
  varType: VarType;
  varName: string;
  varValue: string;
  cssVarName: string;
  cssInsertText: string;
  partialCompletion: CompletionItem;
};

// Generate basic autocompletion data based on varType
const varsCompletionData = Object.fromEntries(
  Object.entries(theme).map(([themeVarType, themeVarValues]) => {
    const varType = themeVarType as VarType;
    const varCompletionData: VarCompletionData[] = Object.entries(themeVarValues).map(
      ([varName, varValue]): VarCompletionData => {
        // if (!isVarName(varName)) throw new Error(`Invalid CDS var name: ${varName}`);
        const cssVarName = createCSSVarName(varType, varName);
        const partialCompletion: CompletionItem = {
          label: cssVarName,
          filterText: cssVarName,
          detail: createVarDetail(varType, varValue),
          documentation: undefined,
          kind:
            varType === 'spectrum' || varType === 'color'
              ? CompletionItemKind.Color
              : CompletionItemKind.Variable,
        };
        return {
          varType,
          varName,
          varValue,
          cssVarName,
          cssInsertText: createVarInsertText(varType, cssVarName),
          partialCompletion,
        };
      },
    );

    return [varType, varCompletionData];
  }),
) as Record<VarType, VarCompletionData[]>;

const connection = createConnection(ProposedFeatures.all);
const textDocumentManager: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

const varsCompletionWeights: [RegExp, VarType[]][] = [
  [/border-radius|borderRadius/, ['borderRadius']],
  [/border-width|borderWidth/, ['borderWidth']],
  [/border-color|borderColor/, ['color', 'spectrum']],
  // [/border/, ['borderRadius', 'borderWidth', 'color', 'spectrum']],
  [/shadow/, ['shadow', 'color', 'spectrum']],
  [/fill|stroke/, ['illustrationColor', 'color', 'spectrum']],
  [
    /color|background|shadow|border|column-rule|filter|opacity|outline|text-decoration/,
    ['color', 'spectrum'],
  ],
  [/margin|padding|gap|top|left|right|bottom/, ['space']],
  [/width|height/, ['size']],
  [/font-family|fontFamily/, ['fontFamily']],
  [/font-size|fontSize/, ['fontSize']],
  [/font-weight|fontWeight/, ['fontWeight']],
  [/line-height|lineHeight/, ['lineHeight']],
  // [/font/, ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight']],
  [/z-index|zIndex/, ['zIndex']],
];

connection.onInitialize((params: InitializeParams) => {
  const customData = params.initializationOptions as CustomInitializationOptions;

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        triggerCharacters: ['-'],
      },
    },
  };
  return result;
});

connection.onCompletion((params: CompletionParams): CompletionItem[] => {
  const { textDocument: textDocumentId, position, context } = params;
  const textDocument = textDocumentManager.get(textDocumentId.uri);
  if (!textDocument || !context) return [];

  const currentText = textDocument.getText({
    start: { line: position.line, character: 0 },
    end: { line: position.line, character: 1000 },
  });

  const matchedCompletionData: VarCompletionData[] = [];

  for (const [regex, varTypesByWeight] of varsCompletionWeights) {
    if (regex.test(currentText)) {
      for (const varType of varTypesByWeight) {
        matchedCompletionData.push(...varsCompletionData[varType]);
      }
    }
  }

  // TO DO: Find a better way to sort the completion items
  const sortedMatchedCompletionData = matchedCompletionData.map((o, i) => ({
    ...o,
    // I think this only affects sorting amongst autocomplete items that are scored the same
    sortText: ''.padStart(i + 1, 'a'),
  }));

  const completionData =
    matchedCompletionData.length > 0
      ? sortedMatchedCompletionData
      : Object.values(varsCompletionData).flat();

  const { languageId } = textDocument;
  const { triggerCharacter } = context;
  const completionItems: CompletionItem[] = [];

  if (languageId === 'css' || languageId === 'scss') {
    completionItems.push(
      ...completionData.map((d) => ({
        ...d.partialCompletion,
        insertText: d.cssInsertText,
      })),
    );
  } else {
    /**
     * Completions in JavaScript and TypeScript are slightly more complex for two reasons:
     *
     * 1. We want to use the same `-` triggerCharacter that we use for CSS and SCSS - but the JS/TS language
     *    servers do not automatically remove the `-` triggerCharacter like the CSS/SCSS language servers do.
     *    To fix this we check the position of the trigger character and replace it as necessary.
     *
     * 2. We want to be able to automatically insert (or not insert) quotation marks as necessary based on the
     *    context. To support this we check the surrounding text of the trigger character.
     */
    const textIncludingTrigger = textDocument.getText({
      start: { line: position.line, character: 0 },
      end: { line: position.line, character: position.character },
    });
    const isDoubleHyphen = textIncludingTrigger.endsWith('--');
    const triggerStartPosition = position.character - (isDoubleHyphen ? 2 : 1);
    const textEditRange = {
      start: { line: position.line, character: triggerStartPosition },
      end: { line: position.line, character: position.character },
    };
    const textSurroundingTrigger = textDocument.getText({
      start: { line: position.line, character: triggerStartPosition - 1 },
      end: { line: position.line, character: position.character + 1 },
    });
    const charBeforeTrigger = textSurroundingTrigger.charAt(0);
    const charAfterTrigger = textSurroundingTrigger.charAt(textSurroundingTrigger.length - 1);
    const hasStartQuote = charBeforeTrigger === '"' || charBeforeTrigger === "'";
    const hasEndQuote = charAfterTrigger === '"' || charAfterTrigger === "'";
    const quoteChar = "'";

    // JavaScript/TypeScript completion items
    completionItems.push(
      ...completionData.map((d) => ({
        ...d.partialCompletion,
        // Ensures the trigger character '-' is replaced in non-CSS environments
        textEdit: {
          range: textEditRange,
          newText: `${hasStartQuote ? '' : quoteChar}${d.cssInsertText}${
            hasEndQuote ? '' : quoteChar
          }`,
        },
      })),
    );
  }

  return completionItems;
});

textDocumentManager.listen(connection);
connection.listen();
