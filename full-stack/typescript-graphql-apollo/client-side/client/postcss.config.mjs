/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  sourceMap: false,
  parser: 'postcss-scss',
};

export default config;