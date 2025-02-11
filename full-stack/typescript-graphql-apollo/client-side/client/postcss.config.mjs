/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  sourceMap: true,
  parser: 'postcss-scss',
};

export default config;