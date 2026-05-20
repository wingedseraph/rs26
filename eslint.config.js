// @ts-check
import antfu from '@antfu/eslint-config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
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
    tsconfigPath: './tsconfig.json',
    filesTypeAware: ['**/*.ts', '**/*.tsx'],
    overridesTypeAware: { 'ts/no-unsafe-assignment': 'error', 'ts/no-unsafe-argument': 'error', 'ts/no-unsafe-call': 'error', 'ts/no-unsafe-member-access': 'error', 'ts/no-unsafe-return': 'error' },
    overrides: {
      'ts/consistent-type-definitions': ['error', 'type'],
      'no-restricted-syntax': ['error', {
        selector: 'TSEnumDeclaration',
        message: 'Use "as const" object instead of enum',
      }],
      'max-lines-per-function': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
      'complexity': ['warn', 13],
      'ts/naming-convention': ['error', {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'has', 'should', 'can', 'did', 'will'],
      }, {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      }, {
        selector: 'typeLike',
        format: ['PascalCase'],
      }],
      'ts/strict-boolean-expressions': ['error', {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
      }],
      'ts/switch-exhaustiveness-check': 'error',
      'ts/no-unsafe-type-assertion': 'error',
      'ts/prefer-nullish-coalescing': ['error', {
        ignoreTernaryTests: false,
        ignoreConditionalTests: false,
      }],
      'ts/no-misused-promises': ['error', {
        checksVoidReturn: { attributes: false },
      }],
      'ts/return-await': ['error', 'in-try-catch'],
      'ts/no-shadow': ['error', {
        hoist: 'all',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
        ignoreTypeValueShadow: true,
      }],
    },
  },
  rules: {
    'unicorn/prevent-abbreviations': [
      'error',
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
})
