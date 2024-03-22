const { plugin } = require('postcss')

module.exports = plugin('postcss-clean', () => {
  const variableMap = {}

  return (root) => {
    // First pass: collect variable declarations
    const time = Date.now()
    root.walkDecls((decl) => {
      if (decl.prop.startsWith('--') && decl.value.startsWith('var(')) {
        const variableName = decl.prop
        const variableValue = decl.value.match(/var\((.*?)\)/)?.[1]

        if (variableValue) {
          variableMap[variableName] = variableValue
        }
      }
    })

    // Second pass: replace variables
    root.walkDecls((decl) => {
      if (decl.value.startsWith('var(')) {
        const replacedValue = decl.value.replace(/var\((.*?)\)/g, (match, varName) => {
          return `var(${variableMap[varName.trim()]})` || match
        })

        decl.value = replacedValue
      }
    })

    // Remove variable declarations
    Object.keys(variableMap).forEach((variableName) => {
      root.walkDecls((decl) => {
        if (decl.prop === variableName) {
          decl.remove()
        }
      })
    })

    console.log('Time:', Date.now() - time)
  }
})
