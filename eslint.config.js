// @ts-check
import antfu from '@antfu/eslint-config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import oxlint from 'eslint-plugin-oxlint'
import testingLibrary from 'eslint-plugin-testing-library'

export default antfu({
  markdown: false,
  react: true,
  jsx: {
    a11y: true,
  },
  stylistic: {
    quotes: 'single',
  },
  typescript: {
    erasableOnly: true,
    overrides: {
      'ts/consistent-type-definitions': ['error', 'type'],
      'no-restricted-syntax': ['error', {
        selector: 'TSEnumDeclaration',
        message: 'Use "as const" object instead of enum',
      }],
      'max-lines-per-function': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
      'complexity': ['warn', 13],
    },
  },
  rules: {
    'unicorn/prevent-abbreviations': [
      'error',
      { replacements: { ref: false } },
    ],
    'style/jsx-quotes': ['error', 'prefer-single'],
    'style/no-trailing-spaces': 'error',
    'style/jsx-newline': ['error', { prevent: true, allowMultilines: true }],
    'style/padded-blocks': ['error', 'never'],
    'no-warning-comments': [
      'warn',
      { terms: ['todo', 'fix', 'refactor'], location: 'start' },
    ],
    'perfectionist/sort-imports': ['error', {
      newlinesBetween: 1,
      groups: [
        'type-import',
        'react',
        ['value-builtin', 'value-external'],
        'type-internal',
        'value-internal',
        ['type-parent', 'type-sibling', 'type-index'],
        ['value-parent', 'value-sibling', 'value-index'],
        'unknown',
      ],
      customGroups: [
        {
          groupName: 'react',
          elementNamePattern: ['^react$', '^react-.+'],
        },
      ],
    }],
  },
}, {
  files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  plugins: {
    'testing-library': testingLibrary,
  },
  rules: {
    ...testingLibrary.configs['flat/react'].rules,
    'test/prefer-lowercase-title': 'off',
    'ts/no-explicit-any': 'off',
    'max-lines-per-function': 'off',
  },
}, {
  plugins: {
    'better-tailwindcss': eslintPluginBetterTailwindcss,
  },
  rules: {
    ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
    ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
    'better-tailwindcss/enforce-canonical-classes': 'off',
    'better-tailwindcss/no-unknown-classes': [
      'error',
      {
        ignore: [
          'appear',
          'button-animation',
          'text-cta-about',
          'text-header-about',
        ],
      },
    ],
  },
  settings: {
    'better-tailwindcss': {
      entryPoint: './src/index.css',
    },
  },
}, ...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json'))
