module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [0],
    'scope-enum': [2, 'always', ['root', 'leech', 'armory']],
  },
};
