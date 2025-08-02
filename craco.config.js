const path = require('path'); // << 이 줄을 추가하세요

module.exports = {
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      '@babel/plugin-proposal-optional-chaining'
    ],
  },

  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
};