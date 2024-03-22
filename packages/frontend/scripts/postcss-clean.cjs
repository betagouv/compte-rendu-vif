const { plugin } = require('postcss')

module.exports = plugin('postcss-clean', () => {
  const variableMap = {}

  return (root) => {
    // First pass: collect variable declarations and remove them
    root.walkDecls((decl) => {
      if (decl.prop.startsWith('--') && decl.value.startsWith('var(')) {
        const variableName = decl.prop
        const variableValue = decl.value.match(/var\((.*?)\)/)?.[1]

        if (variableValue) {
          variableMap[variableName] = variableValue
          decl.remove()
        }
      }
    })

    // Second pass: replace variables
    root.walkDecls((decl) => {
      if (decl.value.startsWith('var(')) {
        const replacedValue = decl.value.replace(/var\((.*?)\)/g, (match, varName) => {
          const name = variableMap[varName.trim()]
          return name ? `var(${name})` : match
        })
        decl.value = replacedValue
      }
    })
  }
})
