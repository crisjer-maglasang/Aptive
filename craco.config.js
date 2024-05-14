const path = require('path');
module.exports = {
  eslint: {
    enable: true,
    mode: 'extends',
    pluginOptions: {
      lintDirtyModulesOnly: true,
    },
  },
  jest: {
    moduleNameMapper: {
      '^@/(.+)': '<rootDir>/src/$1',
    },
    configure: {
      roots: '<rootDir>/src',
    },
  },
  style: {
    postcssOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    alias: {
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/redux': path.resolve(__dirname, './src/redux'),
      '@/api': path.resolve(__dirname, './src/api'),
      '@/modules': path.resolve(__dirname, './src/modules'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/routing': path.resolve(__dirname, './src/routing'),
    },
  },
};
