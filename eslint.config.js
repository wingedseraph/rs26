import antfu from '@antfu/eslint-config'

export default antfu({
  markdown: false,
  react: true,

  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'type'],
    },
  },
  rules: {
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
})
