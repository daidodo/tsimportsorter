import { resolveConfig } from 'prettier';

import { Configuration } from './types';

// https://prettier.io/docs/en/options.html
export function loadPretConfig(fileName: string): Configuration {
  const config = resolveConfig.sync(fileName, { useCache: false });
  if (!config) return {};
  const {
    printWidth,
    useTabs,
    tabWidth,
    semi,
    singleQuote,
    trailingComma,
    bracketSpacing,
    endOfLine,
  } = config;
  return {
    maximumLineLength: printWidth ?? 80,
    tabType: useTabs ? 'tab' : 'space',
    tabSize: tabWidth ?? 2,
    hasSemicolon: semi ?? true,
    quoteMark: singleQuote ? 'single' : 'double',
    trailingComma: trailingComma === 'all' ? 'multiLine' : 'none',
    bracketSpacing: bracketSpacing ?? true,
    eol: endOfLine === 'lf' ? 'LF' : endOfLine === 'crlf' ? 'CRLF' : undefined,
  };
}