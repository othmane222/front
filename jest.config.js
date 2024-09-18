module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.jsx', '.js'],
  globals: {
    'babel-jest': {
      useESM: true,
    },
  },
};
