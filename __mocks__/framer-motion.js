const React = require('react');

const motion = new Proxy({}, {
  get: (_, tag) => {
    const Component = React.forwardRef(({ children, ...props }, ref) => {
      const filtered = Object.fromEntries(
        Object.entries(props).filter(([key]) =>
          !['initial', 'animate', 'exit', 'transition', 'variants', 'whileHover', 'whileTap', 'whileFocus', 'layout', 'layoutId'].includes(key)
        )
      );
      return React.createElement(tag, { ...filtered, ref }, children);
    });
    Component.displayName = `motion.${tag}`;
    return Component;
  }
});

const AnimatePresence = ({ children }) => React.createElement(React.Fragment, null, children);

module.exports = { motion, AnimatePresence };
