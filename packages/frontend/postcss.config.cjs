module.exports = {
  plugins: [require('./scripts/postcss-clean.cjs')({ preserve: false })],
}
