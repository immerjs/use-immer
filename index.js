var produce = require("immer").default;
var React = require("react");

module.exports.useImmer = function useImmer(initialValue) {
  const [val, updateValue] = React.useState(initialValue);
  return [
    val,
    updater => {
      updateValue(produce(updater));
    }
  ];
};

module.exports.useImmerReducer = function useImmerReducer(
  reducer,
  initialState,
  initialAction
) {
  reducer = React.useMemo(() => produce(reducer), [produce, reducer]);
  return React.useReducer(reducer, initialState, initialAction);
};
