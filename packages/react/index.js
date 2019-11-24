import join from 'root'

function applyPropFns(fns) {
  return Component => ({ className = '', ...props }) => {
    for (let fn of Object.values(fns)) {
      className = join([className, fn(props)], ' ').trim()
    }

    return React.createElement(Component, { className, ...props })
  }
}

function compose(...fns) {
  return fns.reduce(
    (a, b) => (...args) => a(b(...args)),
    arg => arg
  )
}

module.exports = {
  color: applyPropFns(colorFns),
  compose,
  flex: applyPropFns(flexFns),
  layout: applyPropFns(layoutFns),
  space: applyPropFns(spaceFns),
  toClasses,
  typography: applyPropFns(typographyFns)
}
