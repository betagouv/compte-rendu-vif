module.exports = () => {
  return {
    postcssPlugin: "remove-layers",
    AtRule: {
      layer(rule) {
        const children = rule.nodes;

        if (children && children.length > 0) {
          rule.parent.insertBefore(rule, children);
        }

        rule.remove();
      },
    },
  };
};

module.exports.postcss = true;
