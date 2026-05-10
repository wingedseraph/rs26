// @ts-check
import antfu from '@antfu/eslint-config'
import testingLibrary from 'eslint-plugin-testing-library'

export default antfu({
  markdown: false,
  react: true,
  stylistic: {
    quotes: 'single',
  },

  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'type'],
    },
  },
  rules: {
    'style/jsx-quotes': ['error', 'prefer-single'],
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
  },
})
