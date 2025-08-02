// const CracoFastRefreshPlugin = require('craco-fast-refresh'); // 이 줄을 삭제합니다.

module.exports = {
  // plugins 배열을 비우거나 삭제합니다.
  // plugins: [
  //   {
  //     plugin: CracoFastRefreshPlugin,
  //   },
  // ],

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
      // Babel 'loose' 옵션 경고 해결을 위한 설정
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],

      // 기존 optional chaining 플러그인은 유지
      '@babel/plugin-proposal-optional-chaining'
    ],
  },

  // webpack 설정을 모두 제거합니다.
  // webpack: {
  //   ...
  // }
};