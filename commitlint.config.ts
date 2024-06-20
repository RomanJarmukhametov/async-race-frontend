module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'doc',
        'init',
        'feat',
        'fix',
        'refactor',
        'docs',
        'build',
        'chore',
        'ci',
        'perf',
        'revert',
        'style',
        'test',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
  },
};
