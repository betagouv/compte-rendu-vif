const { plugin } = require('postcss')

/**
 * This PostCSS plugin aims to replace CSS variables referencing other variables with the actual value.
* 
* Example:
* ```css
* :root {
*   --primary-color: #ff0000;
*   --secondary-color: var(--primary-color);
* }
* 
* body {
*   color: var(--secondary-color);
* }
* ```
* 
* After running this plugin, the CSS will be transformed to:
* ```css
* :root {
*   --primary-color: #ff0000;
*   --secondary-color: #ff0000;
* }
*
* body {
*   color: #ff0000;
* }
* ```
}
 */

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
